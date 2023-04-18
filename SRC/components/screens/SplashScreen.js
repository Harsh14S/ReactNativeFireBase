import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Auth from '@react-native-firebase/auth';
import { StackActions } from '@react-navigation/native';

export default SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      const unsunscribe = Auth().onAuthStateChanged(user => {
        // console.log('User: ', user);
        const routeName = user !== null ? 'homeScreen' : 'loginScreen';
        unsunscribe();
        navigation.dispatch(StackActions.replace(routeName));
        // navigation.navigate(routeName);
      });
    }, 1000);
    return () => { };
  }, []);
  return (
    <View style={styles.container}>
      <Text>SplashScreen</Text>
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
