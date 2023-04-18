import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import IconLinks from '../../common/IconLinks';

export default TOSelectBtn = ({ title, onPress, buttonStyle, textStyle, ...props }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <TouchableOpacity
      {...props}
      style={styles.langBtn}
      onPress={() => {
        onSelect(index);
        // i18n.changeLanguage(item.language)
      }}>
      <Image style={styles.radioBtn} source={isActive ? IconLinks.radioBtnSel : IconLinks.radioBtnUnsel} />
      <Text style={styles.langTxt}>{item.name}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({

})
