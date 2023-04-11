import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import FrontScreen from '../screens/FrontScreen';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import MobileVerifyScreen from '../screens/MobileVerifyScreen';
import ImageUpload from '../screens/ImageUpload';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="splashScreen"
      screenOptions={{
        headerShown: false,
      }}>
      {/* <Stack.Screen name="splashScreen" component={SplashScreen} />
      <Stack.Screen name="signupScreen" component={SignupScreen} />
      <Stack.Screen name="loginScreen" component={LoginScreen} />
      <Stack.Screen name="homeScreen" component={HomeScreen} />
      <Stack.Screen name="mobileVerifyScreen" component={MobileVerifyScreen} />
      <Stack.Screen name="imageUpload" component={ImageUpload} /> */}
    </Stack.Navigator>
  );
};
export default MainNavigator;

const styles = StyleSheet.create({});
