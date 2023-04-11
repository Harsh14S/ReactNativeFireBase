import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Auth from '@react-native-firebase/auth';
import { StackActions } from '@react-navigation/native';
import { RFPercentage } from 'react-native-responsive-fontsize';

export default SSplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      const unsunscribe = Auth().onAuthStateChanged(user => {
        // console.log('User: ', user);
        const routeName = user !== null ? 'homeScreen' : 'loginScreen';
        unsunscribe();
        navigation.dispatch(StackActions.replace('signinScreen'));
        // navigation.navigate(routeName);
      });
    }, 1000);
    return () => { };
  }, []);
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: RFPercentage(5), fontWeight: '800', color: 'brown' }}>Social App</Text>
      <Text style={{ fontSize: RFPercentage(2), fontWeight: '800', color: 'black' }}>With Firebase</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
