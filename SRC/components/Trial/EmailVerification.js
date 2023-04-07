import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CommonStyles from '../../common/CommonStyles';
import {RFPercentage} from 'react-native-responsive-fontsize';
import InputBox from '../../common/subComponents/InputBox';
import ManualButton from '../../common/subComponents/ManualButton';

const EmailVerification = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Email Login</Text>
      <View style={styles.inputContainer}>
        <InputBox
          title={'Email'}
          placeholder={'Enter your email account'}
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <InputBox
          title={'Password'}
          placeholder={'Enter your password'}
          onChangeText={text => setPassword(text)}
          value={password}
        />
      </View>
      <ManualButton title="Login" onPress={() => {}} />
    </View>
  );
};

export default EmailVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
