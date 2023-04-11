import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommonStyles from '../../common/CommonStyles'
import { RFPercentage } from 'react-native-responsive-fontsize'

export default SHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SHomeScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: CommonStyles.Padding.paddingTop,
    paddingBottom: CommonStyles.Padding.paddingBottom,
    paddingHorizontal: RFPercentage(2),
  }
})
