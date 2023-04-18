import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';
import CommonStyles from '../../common/CommonStyles';
import ManualButton from '../../common/subComponents/ManualButton';
import InputBox from '../../common/subComponents/InputBox';
import { StackActions } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'

export default MobileVerifyScreen = ({ navigation }) => {
  const [phoneNum, setPhoneNum] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmData, setConfirmData] = useState('');
  const [message, setMessage] = useState(null);

  const sendOtp = async () => {
    try {
      const mobileNum = "+91" + phoneNum;
      const response = await auth().signInWithPhoneNumber(mobileNum);
      setConfirmData(response);
      console.log("Response: ", response);
      alert("Otp is sent, please verify it.")
    } catch (error) {
      console.log("Error: ", error);
      setMessage(error);
    }
  }

  const submitOtp = async () => {
    try {
      const response = await confirmData.confirm(otp);
      console.log("Response: ", response);
      alert("Your number is verified.")
    } catch (error) {
      console.log("Error: ", error);
      setMessage(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mobile Verify</Text>
      <View style={styles.inputContainer}>

        <InputBox
          title={'Phone Number'}
          autoCapitalize="none"
          placeholder={'Enter your Phone number'}
          onChangeText={phoneNumber => setPhoneNum(phoneNumber)}
          value={phoneNum}
          inputMode={'numeric'}
        />
        <ManualButton title="Send OTP" onPress={() => sendOtp()} />
        <InputBox
          title={'OTP'}
          autoCapitalize="none"
          placeholder={'Enter your OTP'}
          onChangeText={nameTxt => setOtp(nameTxt)}
          value={otp}
        // inputMode={'numeric'}
        />

      </View>
      <View style={styles.btnContainer}>
        <ManualButton title="Submit" onPress={() => submitOtp()} />
        {/* <Text
          style={{
            textAlign: 'center',
            fontSize: RFPercentage(2),
            marginTop: RFPercentage(1),
          }}>
          Already have an account?{' '}
          <Text
            style={{ fontWeight: '700' }}
            onPress={() => navigation.navigate('loginScreen')}>
            Login
          </Text>
        </Text> */}
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

