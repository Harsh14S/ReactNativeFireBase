import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CommonStyles from './SRC/common/CommonStyles';
import EmailVerification from './SRC/components/Trial/EmailVerification';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'dark-content'}
      />
      <EmailVerification />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
