import {
  Alert,
  Dimensions,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import InputBox from '../../common/subComponents/InputBox';
import CommonStyles from '../../common/CommonStyles';
import ManualButton from '../../common/subComponents/ManualButton';
import database from '@react-native-firebase/database';

export default ToDo = () => {
  const [inputName, setInputName] = useState(null);
  const [list, setList] = useState(null);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  // const [lname, setLName] = useState(null);
  // const [age, setAge] = useState(null);
  useEffect(() => {
    getDatabase();
  }, []);
  const getDatabase = async () => {
    try {
      // const data = await database().ref("todo").once('value')
      await database()
        .ref('todo')
        .on('value', temp => {
          // console.log("Todo Data: ", data);
          setList(temp.val());
        });
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const submitData = async () => {
    Keyboard.dismiss();
    try {
      if (inputName.length > 0) {
        const index = list.length;
        await database().ref(`todo/${index}`).set({
          value: inputName,
        });
        setInputName('');
      }
      // console.log("Response: ", response);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const handleUpdateData = async () => {
    Keyboard.dismiss();
    try {
      if (inputName.length > 0) {
        await database().ref(`todo/${selectedCardIndex}`).update({
          value: inputName,
        });
        setInputName('');
        setIsUpdateData(false);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const handleCardPress = (cardIndex, cardValue) => {
    try {
      // console.log(cardIndex);
      setIsUpdateData(true);
      setSelectedCardIndex(cardIndex);
      setInputName(cardValue);
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  const handleCardLongPress = (cardIndex, cardValue) => {
    try {
      Alert.alert('Delete', `Are you sure to delete: '${cardValue}'?`, [
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await database().ref(`todo/${cardIndex}`).remove();
              setInputName('');
              setIsUpdateData(false);
            } catch (error) {
              console.log('Error: ', error);
            }
          },
        },
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel');
          },
        },
      ]);
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>ToDo</Text>
      <View style={styles.inputContainer} showsVerticalScrollIndicator={false}>
        <InputBox
          placeholder="Enter your full name"
          title="Full Name"
          onChangeText={text => setInputName(text)}
          value={inputName}
        />
      </View>
      <Text style={styles.title}>Users Name</Text>
      <FlatList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        data={list}
        renderItem={item => {
          const cardIndex = item.index;
          // console.log("Item: ", item.item);
          if (item.item !== null) {
            return (
              <TouchableOpacity
                style={styles.listItemContainer}
                onPress={() => handleCardPress(cardIndex, item.item.value)}
                onLongPress={() =>
                  handleCardLongPress(cardIndex, item.item.value)
                }>
                <Text style={styles.listItems}>{item.item.value}</Text>
              </TouchableOpacity>
            );
          }
        }}
      />
      {isUpdateData ? (
        <ManualButton title="Update" onPress={() => handleUpdateData()} />
      ) : (
        <ManualButton title="Add" onPress={() => submitData()} />
      )}
      {/* <ManualButton title="Submit" onPress={() => submitData()} /> */}
    </View>
  );
};

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
    marginTop: RFPercentage(1),
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
  },
});
