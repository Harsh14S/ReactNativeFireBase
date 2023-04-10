import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import CommonStyles from '../CommonStyles';

export default InputBox = ({
  title,
  placeholder,
  inputStyle,
  containerStyle,
  error,
  ...props
}) => {
  // const [active, setActive] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        {...props}
        autoCorrect={false}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          styles.inputBox,
          inputStyle,
          {borderColor: error ? 'red' : isFocused ? 'blue' : 'black'},
        ]}
      />
      {error && <Text style={styles.invalidLoginMsg}>{error}</Text>}
    </View>
  );
};

// const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: RFPercentage(1),
  },
  title: {
    fontSize: RFPercentage(2.5),
    marginBottom: RFPercentage(1),
  },
  inputBox: {
    // width:
    height: RFPercentage(6),
    backgroundColor: 'lightgrey',
    color: 'black',
    borderWidth: RFPercentage(0.1),
    paddingHorizontal: RFPercentage(2),
    fontSize: RFPercentage(2.2),
    borderRadius: RFPercentage(1.5),
  },
  invalidLoginMsg: {
    color: 'red',
  },
});
