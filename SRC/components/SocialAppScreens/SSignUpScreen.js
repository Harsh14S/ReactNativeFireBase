import { Platform, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import InputBox from '../../common/subComponents/InputBox';
import ManualButton from '../../common/subComponents/ManualButton';
import CommonStyles from '../../common/CommonStyles';
import messaging from '@react-native-firebase/messaging'

import firestore from '@react-native-firebase/firestore';
import { StackActions } from '@react-navigation/native';

export default SSignUpScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    // requestUserPermission();


    // notificationListener();
    Platform.OS === 'ios' ? null : getFcmToken();
  }, []);


  const getFcmToken = async () => {
    // await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    // const token = await messaging().registerDeviceForRemoteMessages();
    // const token = await messaging().getToken();
    // console.log('Token achieved: ', token);
    setFcmToken(token);
  }

  const saveData = async () => {
    try {
      const checkExistingUser = await firestore().collection('Users').where('email', '==', email).get();
      // console.log("checkExistingUser: ", checkExistingUser.docs.length);
      if (checkExistingUser.docs.length > 0) {
        alert('User with same email id already exists');
        setEmail('');
        setPassword('');
        setName('');
      } else {
        const response = await firestore().collection('Users').add({
          email: email,
          password: password,
          name: name,
          token: fcmToken,
        })
        console.log("fcmToken: ", fcmToken);
        navigation.dispatch(StackActions.replace('homeScreen'));
        alert("Account created successfully");
      }
    } catch {
      (error) => {
        console.log("Error: ", error);
      }
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <InputBox
          title={'Email'}
          autoCapitalize="none"
          placeholder={'Enter your email account'}
          onChangeText={emailTxt => setEmail(emailTxt)}
          value={email}
          inputMode={'email'}
        />
        <InputBox
          title={'Name'}
          autoCapitalize="none"
          placeholder={'Enter your full name'}
          onChangeText={nameTxt => setName(nameTxt)}
          value={name}
          inputMode={'text'}
        />
        <InputBox
          secureTextEntry={true}
          title={'Password'}
          placeholder={'Enter your password'}
          onChangeText={passwordTxt => setPassword(passwordTxt)}
          value={password}
          error={errorMsg}
        />
      </View>
      <View style={styles.btnContainer}>
        <ManualButton title="Sign Up" onPress={() => {
          saveData();
          // console.log('Token achieved: ', fcmToken);
        }} buttonStyle={{ backgroundColor: 'orange' }} />
        <Text
          style={{
            textAlign: 'center',
            fontSize: RFPercentage(2),
            marginTop: RFPercentage(1),
          }}>
          Already have an account?
          <Text
            style={{ fontWeight: '700' }}
            onPress={() => navigation.dispatch(StackActions.replace('signinScreen'))}> Sign In</Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: CommonStyles.Padding.paddingTop,
    paddingBottom: CommonStyles.Padding.paddingBottom,
    paddingHorizontal: RFPercentage(2),
  },
  headingText: {
    fontSize: RFPercentage(3),
    fontWeight: '700',
    textAlign: 'center',
    marginTop: RFPercentage(2),
    color: 'black'
  },
  btnContainer: {
    marginVertical: RFPercentage(2),
  },
})
