import { Platform, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SSplashScreen from '../SocialAppScreens/SSplashScreen';
import SSignInScreen from '../SocialAppScreens/SSignInScreen';
import SSignUpScreen from '../SocialAppScreens/SSignUpScreen';
import SHomeScreen from '../SocialAppScreens/SHomeScreen';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default SocialAppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="homeScreen"
      // initialRouteName="splashScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="splashScreen" component={SSplashScreen} />
      <Stack.Screen name="signinScreen" component={SSignInScreen} />
      <Stack.Screen name="signupScreen" component={SSignUpScreen} />
      <Stack.Screen name="homeScreen" component={SHomeScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
