import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ManualButton from '../../common/subComponents/ManualButton';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {StackActions} from '@react-navigation/native';

export default FrontScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Welcome</Text>
      <ManualButton
        title={'Signup'}
        onPress={() => {
          navigation.dispatch(StackActions.replace('signupScreen'));
        }}
        textStyle={{fontSize: RFPercentage(2.5)}}
      />
      <ManualButton
        title={'Login'}
        onPress={() => {
          navigation.dispatch(StackActions.replace('loginScreen'));
        }}
        textStyle={{fontSize: RFPercentage(2.5)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: RFPercentage(3),
  },
  headingText: {
    textAlign: 'center',
    fontSize: RFPercentage(3),
    fontWeight: '700',
    color: 'black',
    marginBottom: RFPercentage(1),
  },
});
