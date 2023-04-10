import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Auth from '@react-native-firebase/auth';
import ManualButton from '../../common/subComponents/ManualButton';

export default HomeScreen = ({route, navigation}) => {
  // console.log('Route data: ', route.params);
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>HomeScreen</Text>
      <View style={styles.detailBox}>
        <Text style={styles.subHeadingText}>
          Email:{' '}
          <Text style={styles.detailText}>{Auth().currentUser.email}</Text>
        </Text>
        <Text style={styles.subHeadingText}>
          UId: <Text style={styles.detailText}>{Auth().currentUser.uid}</Text>
        </Text>
      </View>
      <ManualButton
        title={'Logout'}
        onPress={async () => {
          await Auth().signOut();
          navigation.navigate('loginScreen');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: RFPercentage(2.5),
    // alignItems: 'center',
  },
  headingText: {
    fontSize: RFPercentage(3),
    color: 'black',
    textAlign: 'center',
    marginBottom: RFPercentage(2),
    fontWeight: '700',
  },
  detailBox: {
    marginVertical: RFPercentage(2),
  },
  subHeadingText: {
    fontSize: RFPercentage(2.5),
    fontWeight: '700',
    color: 'black',
  },
  detailText: {
    fontSize: RFPercentage(2.5),
    fontWeight: '400',
    color: 'grey',
  },
});
