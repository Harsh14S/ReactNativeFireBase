import { Platform, StatusBar, StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

export default CommonStyle = StyleSheet.create({
  Padding: {
    paddingTop: isIOS ? RFPercentage(4) : StatusBar.currentHeight,
    paddingBottom: isIOS ? RFPercentage(3) : RFPercentage(0.5),
  },
})
