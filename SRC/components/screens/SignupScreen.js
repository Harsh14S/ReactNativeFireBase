import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';
import CommonStyles from '../../common/CommonStyles';
import ManualButton from '../../common/subComponents/ManualButton';
import InputBox from '../../common/subComponents/InputBox';
import {StackActions} from '@react-navigation/native';

export default SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const handleSignUp = async () => {
    try {
      // console.log('Email: ', email);
      // console.log('Password: ', password);
      if (email.length > 0 && password.length > 0) {
        const signupUser = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        console.log('user: ', signupUser);

        if (signupUser.user.emailVerified) {
          navigation.dispatch(StackActions.replace('homeScreen'));
          setMessage(null);
          // setEmail('');
          // setPassword('');
        } else {
          alert('Please verify your email ID');
          await auth().currentUser.sendEmailVerification();
          await auth().signOut();
        }
        // console.log('EmailVerified? ', signupUser.user.emailVerified);
        // console.log('Signedup Successfully');
      } else {
        alert('Please fillup all the fields......');
      }
    } catch (error) {
      console.log('Error: ', error);
      setMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SignUp</Text>
      <View style={styles.inputContainer}>
        <InputBox
          title={'Email'}
          autoCapitalize="none"
          placeholder={'Enter your email account'}
          onChangeText={text => setEmail(text)}
          value={email}
          inputMode={'email'}
        />
        <InputBox
          secureTextEntry={true}
          title={'Password'}
          placeholder={'Enter your password'}
          onChangeText={text => setPassword(text)}
          value={password}
          error={message}
        />
      </View>
      <View style={styles.btnContainer}>
        <ManualButton title="SignUp" onPress={() => handleSignUp()} />
        <Text
          style={{
            textAlign: 'center',
            fontSize: RFPercentage(2),
            marginTop: RFPercentage(1),
          }}>
          Already have an account?{' '}
          <Text
            style={{fontWeight: '700'}}
            onPress={() => navigation.navigate('loginScreen')}>
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: CommonStyles.Padding.paddingTop,
    paddingBottom: CommonStyles.Padding.paddingBottom,
    paddingHorizontal: RFPercentage(1),
  },
  heading: {
    fontSize: RFPercentage(3),
    fontWeight: '700',
    textAlign: 'center',
    marginTop: RFPercentage(1),
  },
  btnContainer: {
    marginVertical: RFPercentage(2),
  },
});
