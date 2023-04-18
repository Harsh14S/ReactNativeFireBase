import { Alert, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './SRC/components/navigation/MainNavigator';
import SocialAppNavigator from './SRC/components/navigation/SocialAppNavigator';
import {
  notificationListener,
  registerAppWithFCM,
  requestUserPermission,
} from './SRC/helper/notificationServices';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
// import { checkNotifications } from 'react-native-permissions'

const App = () => {
  // const [state, setState] = useState({});
  useEffect(() => {
    registerAppWithFCM();
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    createChannels();
    // checkNotificationStatus();

    return unsubscribe;
  }, []);
  // async function checkNotificationStatus() {
  //   if (Platform.OS === 'ios') {
  //     const authStatus = await messaging().hasPermission();
  //     if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
  //       setState({
  //         notification: true
  //       })
  //     } else {
  //       setState({
  //         notification: false
  //       })
  //     }
  //   } else {
  //     checkNotifications().then(({ status }) => {
  //       if (status === 'granted') {
  //         setState({
  //           notification: true
  //         })
  //       } else {
  //         setState({
  //           notification: false
  //         })
  //       }
  //     });
  //   }
  // }
  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'default',
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
        {/* <MainNavigator /> */}
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
