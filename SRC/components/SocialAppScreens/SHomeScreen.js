import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CommonStyles from '../../common/CommonStyles';
import {RFPercentage} from 'react-native-responsive-fontsize';
import ManualButton from '../../common/subComponents/ManualButton';
import PushNotification from 'react-native-push-notification';

export default SHomeScreen = () => {
  const handleNotification = item => {
    // PushNotification.localNotification({
    //   channelId: 'test-channel',
    //   title: item + ' send you appraisel.....',
    //   message: item,
    //   bigText:
    //     'Hello brother, welcome to firebase.......... Ok dokieee. See you soooooooooooooooon\nHello brother, welcome to firebase.......... Ok dokieee. See you soooooooooooooooon\nHello brother, welcome to firebase.......... Ok dokieee. See you soooooooooooooooon',
    //   color: 'red',
    // });
    PushNotification.localNotificationSchedule({
      channelId: 'test-channel',
      title: item,
      message: '5 seconds ago, appraisel was sent.....',
      date: new Date(Date.now() + 5 * 1000),
      allowWhileIdle: false,
    });
    // PushNotification.localNotificationSchedule({
    //   //... You can use all the options from localNotifications
    //   message: 'My Notification Message', // (required)
    //   date: new Date(Date.now() + 60 * 1000), // in 60 secs
    //   allowWhileIdle: false, // (optional) set notification to work while on doze, default: false

    //   /* Android Only Properties */
    //   repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    // });
  };

  return (
    <View style={styles.container}>
      {/* <Text>SHomeScreen</Text> */}
      <Text style={styles.headingText}>Notification</Text>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <ManualButton
          title="Notification"
          onPress={() => {
            handleNotification('Om');
          }}
          buttonStyle={{backgroundColor: 'orange'}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: CommonStyles.Padding.paddingTop,
    paddingBottom: CommonStyles.Padding.paddingBottom,
    paddingHorizontal: RFPercentage(2),
  },
  headingText: {
    fontSize: RFPercentage(3),
    fontWeight: '700',
    textAlign: 'center',
    marginTop: RFPercentage(2),
    color: 'black',
  },
  btnContainer: {
    marginVertical: RFPercentage(2),
  },
});
