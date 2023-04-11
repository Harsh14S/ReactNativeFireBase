import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './SRC/components/navigation/MainNavigator';
import SocialAppNavigator from './SRC/components/navigation/SocialAppNavigator';

const App = () => {
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
