import { Platform, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SSplashScreen from '../SocialAppScreens/SSplashScreen';
import SSignInScreen from '../SocialAppScreens/SSignInScreen';
import SSignUpScreen from '../SocialAppScreens/SSignUpScreen';
import SHomeScreen from '../SocialAppScreens/SHomeScreen';
import SLanguageScreen from '../SocialAppScreens/SLanguageScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Languages from '../../Languages';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default SocialAppNavigator = () => {
  const [selectedLang, setSelectedLang] = useState(0);
  const translation = Languages[selectedLang].translation;

  const getStoreData = async () => {
    try {
      const jsonValue = parseInt(await AsyncStorage.getItem("LANG"));
      setSelectedLang(jsonValue)
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  // useEffect(() => {
  //   setInterval(() => {
  //     getStoreData();
  //   }, 1000)
  // }, [])

  return (
    <Stack.Navigator
      // initialRouteName="homeScreen"
      initialRouteName="splashScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="splashScreen" component={SSplashScreen} options={{ title: 'My home' }} />
      <Stack.Screen name="languageScreen" component={SLanguageScreen} options={{ title: translation.SelectLanguage }} />
      <Stack.Screen name="signinScreen" component={SSignInScreen} options={{ title: translation.Signin }} />
      <Stack.Screen name="signupScreen" component={SSignUpScreen} options={{ title: translation.Signup }} />
      <Stack.Screen name="homeScreen" component={SHomeScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
