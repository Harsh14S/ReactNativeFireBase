import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Trial from './SRC/components/Trial/Trial'
import ToDo from './SRC/components/Trial/ToDo'
import CommonStyles from './SRC/common/CommonStyles'

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'transparent'} translucent={true} barStyle={'dark-content'} />
      <ToDo />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
