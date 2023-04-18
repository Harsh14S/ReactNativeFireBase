import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

class FCMService {

  register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(onRegister, onNotification, onOpenNotification);
  }

  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  }

  checkPermission = (onRegister) => {
    messaging().hasPermission()
      .then(enabled => {
        console.log('permission error enabled', enabled)
        if (enabled == 1) {
          // User has permission
          this.getToken(onRegister);
        } else {
          // User doesn't have permission
          this.requestPermission(onRegister);
        }
      }).catch(error => {
        console.log('permission error', error)
      })
  }

  getToken = (onRegister) => {
    console.log('fcmToken');
    messaging().getToken()
      .then(async fcmToken => {
        if (fcmToken) {
          console.log('fcmToken', fcmToken);
          onRegister(fcmToken);
        }
      }).catch(error => {
        console.log('error', error);
      })
  }

  requestPermission = async (onRegister) => {
    console.log('requestPermission')
    const authStatus = await messaging().requestPermission();
    console.log('permission block', authStatus)
  }

  deleteToken = () => {
    //@ts-ignore
    messaging.deleteToken()
      .catch((error) => {
      })
  }

  createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {

    // When the application is running, but in the background
    messaging()
      .onNotificationOpenedApp(remoteMessage => {
        console.log('onNotificationOpenedApp----------', remoteMessage);
        if (remoteMessage) {
          const notification = remoteMessage.notification
          if (!remoteMessage.data) {
            onOpenNotification(notification);
            return;
          }
          //@ts-ignore
          notification.userInteraction = true;
          onOpenNotification(Platform.OS === 'ios' ? remoteMessage.data.item : remoteMessage);
          // this.removeDeliveredNotification(notification.notificationId)
        }
      });

    // When the application is opened from a quit state.
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log('getInitialNotification-------', remoteMessage);
        if (remoteMessage) {
          const notification = remoteMessage.notification;
          if (!remoteMessage.data) {
            onOpenNotification(notification);
            return;
          }
          //@ts-ignore
          notification.userInteraction = true;
          onOpenNotification(Platform.OS === 'ios' ? remoteMessage.data.item : remoteMessage);
          //this.removeDeliveredNotification(notification.notificationId)
        }
      });

    // Foreground state messages
    messaging().onMessage(async (remoteMessage) => {
      console.log('Foreground state messages-------', remoteMessage);
      if (remoteMessage) {
        let notification = null;
        notification = remoteMessage;
        notification['title'] = remoteMessage.notification.title;
        notification['message'] = remoteMessage.notification.body;
        onNotification(notification);
      }
    });
    // Message received on background
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message received on background-------', remoteMessage);

    });

    // Triggered when have new token
    messaging().onTokenRefresh(fcmToken => {
      onRegister(fcmToken);
    });

  }


}

export const fcmService = new FCMService();
