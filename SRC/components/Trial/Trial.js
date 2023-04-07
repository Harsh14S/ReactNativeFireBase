import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
// import app from './Firebase/firebase';
import firestore from '@react-native-firebase/firestore'
import firedatabase from '@react-native-firebase/database'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { dataRef } from '../../../Firebase/firebase'

export default Trial = () => {
  // console.log("Firebase: ", app);
  const [database, setDatabase] = useState();
  const [userData, setUserData] = useState();

  // dataRef
  useEffect(() => {
    getDataBase();
    getUserDataBase();
  }, [])

  const getDataBase = async () => {
    // firestore database
    try {
      const data = await firestore().collection('testing').doc('Fl2kd16Wz2gOBCf5TGjl').get()
      // console.log("Data: ", data._data);
      setDatabase(data._data);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  const getUserDataBase = async () => {
    try {
      const data = await firedatabase().ref('users/1').once('value');
      // setUserData(JSON.parse(JSON.stringify(data)));
      setUserData(data.val())

    } catch (error) {
      console.log("Error: ", error);
    }
  }

  // const getUserDataSub = () => {
  // dataRef.ref().child('users/1').on('value'
  //   , data => {
  //     // const abc = Object.values(data.val)
  //     const abc = Object.entries(data.val())
  //     // console.log(abc);
  //   })
  // }


  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.txtHeading}>Name</Text>
        <Text style={styles.txt}>{database ? database.name : 'loading'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.txtHeading}>Age</Text>
        <Text style={styles.txt}>{database ? database.age : 'loading'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.txtHeading}>Hobby</Text>
        <Text style={styles.txt}>{database ? database.hobby.map(list => `${list}, `) : 'loading'}</Text>
      </View>
      {
        // console.log("userData.name: ", userData)
      }
      <View style={styles.row}>
        <Text style={styles.txtHeading}>Name</Text>
        <Text style={styles.txt}>{userData ? userData.name : 'loading'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.txtHeading}>Age</Text>
        <Text style={styles.txt}>{userData ? userData.age : 'loading'}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: RFPercentage(0.5)
  },
  txtHeading: {
    flex: 1,
    fontSize: RFPercentage(3),

    fontWeight: '700',
    color: 'black',
    marginHorizontal: RFPercentage(1),
  },
  txt: {
    fontSize: RFPercentage(3),
    fontWeight: '500',
    color: 'grey',
    flex: 4,
    marginRight: RFPercentage(1),
  }
})
