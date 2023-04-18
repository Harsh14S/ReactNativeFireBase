import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Auth from '@react-native-firebase/auth';
import { StackActions } from '@react-navigation/native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Languages from '../../Languages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

export default SSplashScreen = ({ navigation }) => {
  const { t } = useTranslation();
  useEffect(() => {

    storeData();
    setTimeout(() => {
      const unsunscribe = Auth().onAuthStateChanged(user => {
        // console.log('User: ', user);
        // const routeName = user !== null ? 'homeScreen' : 'languageScreen';
        unsunscribe();
        navigation.dispatch(StackActions.replace('languageScreen'));
        // navigation.navigate(routeName);
      });
    }, 1000);
    return () => { };
  }, []);

  const storeData = async () => {
    try {
      // console.log("JSON: ", jsonValue);
      await AsyncStorage.setItem('LANG', '0')
    } catch (error) {
      console.log("Error: ", error);
    }
  }

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
