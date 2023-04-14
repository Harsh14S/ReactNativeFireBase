import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CommonStyles from '../../common/CommonStyles';
import { RFPercentage } from 'react-native-responsive-fontsize';
import ManualButton from '../../common/subComponents/ManualButton';
import { handleCancel, handleScheduleNotification, showNotification } from '../../Notifications/NotificationCommon';

export default SHomeScreen = () => {
  // const time = new Date(Date.now() + 60 * 1000);
  // const time2 = time.setSeconds(time.getSeconds() + 5);
  // console.log("Time: ", time2);
  return (
    <View style={styles.container}>
      {/* <Text>SHomeScreen</Text> */}
      <Text style={styles.headingText}>Notification</Text>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <ManualButton
          title="Notification"
          onPress={() => {
            showNotification('Om', 'Sent you the notification');
          }}
          buttonStyle={{ backgroundColor: 'orange' }}
        />
        <ManualButton
          title="Scheduled Notification"
          onPress={() => {
            handleScheduleNotification('Om', 'Notification Sent after 3 sec');
          }}
          buttonStyle={{ backgroundColor: 'orange' }}
        />
        <ManualButton
          title="Clear Notification"
          onPress={() => {
            handleCancel();
          }}
          buttonStyle={{ backgroundColor: 'orange' }}
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
