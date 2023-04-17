import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize';
import IconLinks from '../../common/IconLinks';
import ManualButton from '../../common/subComponents/ManualButton';
import Languages from '../../Languages';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default LanguageModal = ({ langModalVisible, setLangModalVisible, onSelectLang }) => {

  const [language, setLanguage] = useState(Languages[0]);
  const [selectedLangIndex, setSelectedLangIndex] = useState(0);
  const translation = Languages[selectedLangIndex].translation;

  const onSelect = (ind) => {
    const temp = Languages;
    temp.map((item, index) => {
      if (index === ind) {
        if (item.selected === false) {
          item.selected = true;
          setSelectedLangIndex(ind);
        }
      } else {
        item.selected = false;
      }
      let temp2 = [];
      temp.map(item => {
        temp2.push(item);
      });
    });
  }

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={langModalVisible}
      onRequestClose={() => {
        setLangModalVisible(f);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.headingTxt}>{translation.SelectLanguage}</Text>
          {/* <Text style={styles.headingTxt}>{selectedLangIndex}</Text> */}
          <FlatList
            data={Languages}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.langBtn}
                  onPress={() => onSelect(index)}
                >
                  <Image style={styles.radioBtn} source={item.selected ? IconLinks.radioBtnSel : IconLinks.radioBtnUnsel} />
                  <Text style={styles.langTxt}>{item.languageName}</Text>
                </TouchableOpacity>
              )
            }}
          />
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[styles.btnStyles, { backgroundColor: 'orange', marginRight: RFPercentage(0.5) }]}
              onPress={() => setLangModalVisible(!langModalVisible)}
            >
              <Text style={styles.btnTxt}>{translation.Cancel}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnStyles, { backgroundColor: 'skyblue', marginLeft: RFPercentage(0.5) }]}
              onPress={() => {
                setLangModalVisible(!langModalVisible);
                onSelectLang(selectedLangIndex);
                // storeData(Languages[selectedLangIndex]);
                // console.log("Language: ", Languages[selectedLangIndex]);
              }}
            >
              <Text style={styles.btnTxt}>{translation.Select}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    // height: '35%',
    width: '85%',
    backgroundColor: 'white',
    borderRadius: RFPercentage(3),
    paddingVertical: RFPercentage(2),
    paddingHorizontal: RFPercentage(3),
  },
  headingTxt: {
    textAlign: 'center',
    fontSize: RFPercentage(3),
    color: 'black',
    fontWeight: '500',
    marginBottom: RFPercentage(1),
  },
  langBtn: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    marginVertical: RFPercentage(0.7),
    paddingVertical: RFPercentage(1),
    paddingHorizontal: RFPercentage(1),
    borderRadius: RFPercentage(1),
    borderWidth: RFPercentage(0.1),
    borderColor: 'grey',
  },
  radioBtn: {
    height: RFPercentage(4),
    width: RFPercentage(4)
  },
  langTxt: {
    fontSize: RFPercentage(2),
    marginHorizontal: RFPercentage(1),
    color: 'black',
    fontWeight: '500',
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: RFPercentage(1)
  },
  btnStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: RFPercentage(1),
    paddingVertical: RFPercentage(1.5),
    backgroundColor: 'grey',
    borderRadius: RFPercentage(1),

  },
  btnTxt: {
    fontSize: RFPercentage(2),
    fontWeight: '500',
    color: 'black',
  }
})
