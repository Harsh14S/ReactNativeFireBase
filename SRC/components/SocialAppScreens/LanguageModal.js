import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize';
import IconLinks from '../../common/IconLinks';
import { useTranslation } from 'react-i18next';


let languages = [
  { name: 'English', value: 'en', selected: true },
  { name: 'हिंदी', value: 'hi', selected: false },
  { name: 'ગુજરાતી', value: 'gj', selected: false },
]

export default LanguageModal = ({ langModalVisible, setLangModalVisible }) => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('en');
  const [initLang, setInitLang] = useState(null);

  const onSelect = (ind) => {
    // const temp = languages;
    languages.map((item, index) => {
      if (index === ind) {
        if (item.selected === false) {
          item.selected = true;
        }
      } else {
        item.selected = false;
      }
    });
  }

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={langModalVisible}
      onRequestClose={() => {
        setLangModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.headingTxt}>{t('SelectLanguage')}</Text>
          <FlatList
            data={languages}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.langBtn}
                  onPress={() => {
                    onSelect(index);
                    setLanguage(item.value);
                  }}>
                  <Image style={styles.radioBtn} source={item.selected ? IconLinks.radioBtnSel : IconLinks.radioBtnUnsel} />
                  <Text style={styles.langTxt}>{item.name}</Text>
                </TouchableOpacity>
              )
            }}
          />
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[styles.btnStyles, { backgroundColor: 'orange', marginRight: RFPercentage(0.5) }]}
              onPress={() => {
                setLangModalVisible(false);
                setInitLang(language);
              }}
            >
              <Text style={styles.btnTxt}>{t('Cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnStyles, { backgroundColor: 'skyblue', marginLeft: RFPercentage(0.5) }]}
              onPress={() => {
                setInitLang(language);
                setLangModalVisible(false);
                i18n.changeLanguage(language);
              }}>
              <Text style={styles.btnTxt}>{t('Select')}</Text>
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
