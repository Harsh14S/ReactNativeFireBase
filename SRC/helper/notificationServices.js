// import RNFirebase from 'react-native-firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';
import { PermissionsAndroid } from 'react-native';

export let fcmTokenAndroid = '';
export let fcmTokenIOS = '';

export const requestUserPermission = async () => {
  if (Platform.OS === 'ios') {

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  } else if (Platform.OS === 'android') {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    // if (enabled) {
    //   console.log('Authorization status:', enabled);
    // }
  }
}

export const registerAppWithFCM = async () => {
  if (Platform.OS === 'ios') {
    await messaging().setAutoInitEnabled(true);
    // await messaging().registerDeviceForRemoteMessages();
  }
}

export const getFcmTokenIOS = async () => {
  try {
    // registerAppWithFCM();
    fcmTokenAndroid = await AsyncStorage.getItem('fcmToken');
    console.log("old Generated token:", fcmTokenAndroid);
    if (!fcmTokenAndroid) {
      try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          // console.log("newly Generated token : ", fcmToken);
          await AsyncStorage.setItem('fcmToken', fcmToken)
        }
      } catch (error) {
        console.log("Error FCM token : ", error);
      }
    }
    // console.log("FCM token Generated: ", fcmTokenAndroid);
  } catch (error) {
    console.log("Error while getting token.... ", error);
    console.error(error.message);
  }
}

export const notificationListener = async () => {

  if (requestUserPermission()) {
    messaging().getToken().then(token => {
      console.log("TOken: ", token);
    })
  } else console.log("Failed to get token");

  messaging().onMessage(async remoteMessage => {
    console.log("Received in foreground: ", remoteMessage);
  })

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  // when the app is running in the background

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    navigation.navigate('signupScreen');
  });

  // Register background handler

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  const unsubscribe = messaging().onMessage(async remoteMessage => {
    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  });

  return unsubscribe;
}

