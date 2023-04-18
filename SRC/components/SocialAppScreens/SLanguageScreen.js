import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import InputBox from '../../common/subComponents/InputBox';
import ManualButton from '../../common/subComponents/ManualButton';
import CommonStyles from '../../common/CommonStyles';
import firestore from '@react-native-firebase/firestore';
import { StackActions } from '@react-navigation/native';
import LanguageModal from './LanguageModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Languages from '../../Languages';
import { useTranslation } from 'react-i18next';



export default SSignInScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [langModalVisible, setLangModalVisible] = useState(false);


  const signinFunc = () => {
    navigation.navigate('signinScreen');
  }
  const signupFunc = () => {
    navigation.navigate('signupScreen');
  }

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <Text style={[styles.headingText, { fontSize: RFPercentage(5) }]}>{t('Welcome')}</Text>
        <ManualButton title={t('Signin')} onPress={() => {
          signinFunc()
        }} buttonStyle={{ backgroundColor: 'orange' }} />
        <ManualButton title={t('Signup')} onPress={() => {
          signupFunc()
        }} buttonStyle={{ backgroundColor: 'orange' }} />
      </View>
      <LanguageModal
        langModalVisible={langModalVisible}
        setLangModalVisible={setLangModalVisible} />
      <View style={styles.languageSelectContainer}>
        <ManualButton
          title={t('SelectLanguage')}
          textStyle={{ fontWeight: '400', fontSize: RFPercentage(1.8) }}
          buttonStyle={{ borderWidth: 0.5, borderColor: 'grey', backgroundColor: 'white' }}
          onPress={() => {
            setLangModalVisible(!langModalVisible);
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: CommonStyles.Padding.paddingTop,
    paddingBottom: CommonStyles.Padding.paddingBottom,
    paddingHorizontal: RFPercentage(2),
    backgroundColor: 'white',
  },
  headingText: {
    fontSize: RFPercentage(3.5),
    fontWeight: '700',
    textAlign: 'center',
    marginTop: RFPercentage(2),
    color: 'black',
    marginBottom: RFPercentage(1)
  },
  btnContainer: {
    flex: 1,
    marginVertical: RFPercentage(2),
    justifyContent: 'center',
  },
})
