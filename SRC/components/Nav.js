import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SignUp from './Trial/SignUp';
import LoginSignup from './Trial/LoginSignup';
import LogIn from './Trial/LogIn';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Nav = () => {
  return (
    <Stack.Navigator
      initialRouteName="loginSignup"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="loginSignup" component={LoginSignup} />
      <Stack.Screen name="signUp" component={SignUp} />
      <Stack.Screen name="logIn" component={LogIn} />
    </Stack.Navigator>
  );
};

export default Nav;
const styles = StyleSheet.create({});
