import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import InputBox from '../../common/subComponents/InputBox';
import ManualButton from '../../common/subComponents/ManualButton';
import CommonStyles from '../../common/CommonStyles';
import firestore from '@react-native-firebase/firestore';
import { StackActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export default SSignInScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const signinFunc = async () => {
    try {
      const response = await firestore().collection('Users').where('email', '==', email).get()

      if (response.docs.length > 0) {
        if (response.docs[0]._data.email === email && response.docs[0]._data.password === password) {
          navigation.dispatch(StackActions.replace('homeScreen'))
        } else alert('email or password is wrong')
      } else {
        alert('Account not found');
      }
    } catch {
      (error) => {
        console.log("Error: ", error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>{t('Signin')}</Text>
      <View style={styles.inputContainer}>
        <InputBox
          title={t('Email')}
          autoCapitalize="none"
          placeholder={'Enter your email account'}
          onChangeText={text => setEmail(text)}
          value={email}
          inputMode={'email'}
        />
        <InputBox
          secureTextEntry={true}
          title={t('Password')}
          placeholder={'Enter your password'}
          onChangeText={text => setPassword(text)}
          value={password}
          error={errorMsg}
        />
      </View>
      <View style={styles.btnContainer}>
        <ManualButton title={t('Signin')} onPress={() => {
          signinFunc()
        }} buttonStyle={{ backgroundColor: 'orange' }} />
        <Text
          style={{
            textAlign: 'center',
            fontSize: RFPercentage(2),
            marginTop: RFPercentage(1),
          }}>
          {t('DoUWantToCreateNewAcc')}{' '}
          <Text
            style={{ fontWeight: '700' }}
            onPress={() => navigation.dispatch(StackActions.replace('signupScreen'))}
          >
            {t('Signup')}
          </Text>
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
