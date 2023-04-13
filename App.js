import {Alert, Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './SRC/components/navigation/MainNavigator';
import SocialAppNavigator from './SRC/components/navigation/SocialAppNavigator';
import {
  notificationListener,
  registerAppWithFCM,
  requestUserPermission,
} from './SRC/helper/notificationServices';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';

const App = () => {
  // useEffect(() => {
  //   // Platform.OS === 'android' ?
  //   //   notificationListener() : null;
  // }, [])
  useEffect(() => {
    registerAppWithFCM();
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    createChannels();

    return unsubscribe;
  }, []);

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'dark-content'}
      />
      <NavigationContainer>
        <SocialAppNavigator />
      </NavigationContainer>
      {/* <EmailVerification /> */}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
