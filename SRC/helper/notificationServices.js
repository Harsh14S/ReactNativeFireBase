// import RNFirebase from 'react-native-firebase';
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    Platform.OS === 'ios' ? getFcmTokenIOS() : getFcmTokenAndroid();
  }
}

const getFcmTokenAndroid = async () => {
  try {
    const fcmToken = await messaging().getToken();
    console.log("FCM token Generated: ", fcmToken);
  } catch (error) {
    console.log("Error while getting token.... ", error);
    alert(error?.message);
  }
}
const getFcmTokenIOS = async () => {
  try {
    const fcmToken = await messaging().getAPNSToken().then(() => messaging().getToken())
    console.log("FCM token Generated: ", fcmToken);
  } catch (error) {
    console.log("Error while getting token.... ", error);
    alert(error?.message);
  }
}
