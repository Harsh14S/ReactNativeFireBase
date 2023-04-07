import { Dimensions, FlatList, Keyboard, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize';
import InputBox from '../../common/subComponents/InputBox';
import CommonStyles from '../../common/CommonStyles';
import ManualButton from '../../common/subComponents/ManualButton';
import database from '@react-native-firebase/database'

export default ToDo = () => {
  const [inputName, setInputName] = useState(null);
  const [list, setList] = useState(null);
  // const [fname, setFName] = useState(null);
  // const [lname, setLName] = useState(null);
  // const [age, setAge] = useState(null);
  useEffect(() => {
    getDatabase();
  }, []);
  const getDatabase = async () => {
    try {
      // const data = await database().ref("todo").once('value')
      await database().ref("todo").on('value', (temp) => {
        // console.log("Todo Data: ", data);
        setList(temp.val());
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  const submitData = async () => {
    Keyboard.dismiss();
    try {
      const index = list.length - 1;
      const response = await database().ref(`todo/${index}`).set({
        value: inputName
      });
      // console.log("Response: ", response);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>ToDo</Text>
      <View style={styles.inputContainer} showsVerticalScrollIndicator={false} >
        <InputBox
          placeholder='Enter your full name'
          title="Full Name"
          onChangeText={(text) => setInputName(text)}
          value={inputName}
        />
        {/* <InputBox
          placeholder='Enter your first name'
          title="First Name"
        />
          <InputBox
          placeholder='Enter your last name'
          title="Last Name"
        />
        <InputBox
          placeholder='Enter your age'
          title="Age"
        /> */}
      </View>
      <Text style={styles.title}>Users Name</Text>
      <FlatList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        data={list}
        renderItem={(item) => {
          // console.log("Item: ", item.item);
          if (item.item !== null) {
            return (
              <View style={styles.listItemContainer}>
                <Text style={styles.listItems}>{item.item.value}</Text>
              </View>
            )
          }
        }}
      />
      <ManualButton title="Submit" onPress={() => submitData()} />
    </View>
  )
}

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'lightgrey',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: RFPercentage(2),
    paddingTop: CommonStyles.Padding.paddingTop,
    paddingBottom: CommonStyles.Padding.paddingBottom,
  },
  heading: {
    fontSize: RFPercentage(3),
    fontWeight: '700',
    textAlign: 'center',
    marginTop: RFPercentage(1)
  },
  inputContainer: {
    // flex: 1,
    width: '100%',
    // backgroundColor: 'lightgrey',
  },
  title: {
    fontSize: RFPercentage(2.5),
    fontWeight: '700',
    textAlign: 'center',
    marginTop: RFPercentage(2),
  },
  listItemContainer: {
    backgroundColor: 'orange',
    marginVertical: RFPercentage(1),
    paddingVertical: RFPercentage(1.2),
    paddingHorizontal: RFPercentage(2),
    borderRadius: RFPercentage(1),
  },
  listItems: {
    fontSize: RFPercentage(2.8),
    color: 'black',
  }

})
