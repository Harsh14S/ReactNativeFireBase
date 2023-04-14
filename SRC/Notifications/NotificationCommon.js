import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';

const showNotification = (title, message) => {
  PushNotification.localNotification({
    channelId: 'default',
    title: title,
    message: message,
  });
};

const handleScheduleNotification = (title, message) => {
  const date = new Date()
  const time = Platform.OS === 'ios' ? date.setSeconds(date.getSeconds() + 3) : new Date(Date.now() + 3 * 1000);

  try {
    PushNotification.localNotificationSchedule({
      channelId: 'default',
      title: title,
      message: message,
      date: date,
      allowWhileIdle: true,
    })
  } catch (error) {
    console.log("localNotificationSchedule errro", error)
  }
}



const handleCancel = () => {
  PushNotification.cancelAllLocalNotifications()
};

export { showNotification, handleScheduleNotification, handleCancel };
