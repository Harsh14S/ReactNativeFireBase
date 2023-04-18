import { Alert, Image, Platform, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';
import CommonStyles from '../../common/CommonStyles';
import ManualButton from '../../common/subComponents/ManualButton';
import InputBox from '../../common/subComponents/InputBox';
import DocumentPicker from 'react-native-document-picker'
import storage from '@react-native-firebase/storage';
import { PERMISSIONS, request } from 'react-native-permissions';
import { launchImageLibrary } from 'react-native-image-picker';


export default ImageUpload = ({ navigation }) => {
  const askForPermissions = (permission) => {
    request(permission).then(result => {
      switch (result) {
        case 'unavailable':
          console.log('This feature is not available (on this device / in this context)');
          break;
        case 'denied':
          console.log('The permission has not been requested / is denied but requestable');
          break;
        case 'limited':
          console.log('The permission is limited: some actions are possible');
          break;
        case 'granted':
          console.log('The permission is granted');
          break;
        case 'blocked':
          console.log('The permission is denied and not requestable anymore');
          break;
        default:
          console.log(result);
      }
    })
  }

  const [imageData, setImageData] = useState(null);
  const [imgDownUrl, setImgDownUrl] = useState(null);
  const [imgDeletePath, setImgDeletePath] = useState(null);
  const [editedName, setEditedName] = useState(null);

  const pickImage = async () => {
    try {

      //document picker works in android
      // const response = await DocumentPicker.pickSingle({
      //   type: [DocumentPicker.types.images],
      //   copyTo: 'cachesDirectory'  // replace uri with fileCopyUri
      // });
      // console.log("Response: ", response);
      // setImageData(response);
      const response = await launchImageLibrary();
      // console.log("Response: ", response.assets[0]);
      setImageData(response.assets[0]);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  const uploadImage = async () => {
    try {
      const imgName = editedName ? editedName : imageData.fileName
      // console.log("Image uri: ", imageData.fileName);
      const response = storage().ref(`/profile/${imgName}`);
      const put = await response.putFile(imageData.uri);
      // // console.log("Response: ", put.metadata.fullPath);
      setImgDeletePath(put.metadata.fullPath);
      const url = await response.getDownloadURL();
      setImgDownUrl(url);
      alert("Image Uploaded.....");
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  const deleteImage = async () => {
    try {
      await storage().ref(imgDeletePath).delete();
      setImgDownUrl(null);
      setImgDeletePath(null);
      alert("Image Deleted.....");
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Image Upload</Text>
      {
        imageData ?
          <View style={styles.inputContainer}>
            <InputBox
              title={'Image Name'}
              autoCapitalize="none"
              placeholder={'Enter image name'}
              onChangeText={name => setEditedName(name)}
              value={editedName}
              inputMode={'text'}
            />
          </View> : null
      }

      <View style={styles.imageContainer}>
        {
          imageData ?
            <Image style={styles.selectedImage} source={{ uri: imageData.uri }} resizeMode='contain' /> :
            <Text style={{ fontSize: RFPercentage(2.5), fontWeight: '600', color: 'grey' }}>Please Select the image</Text>
        }
      </View>
      <View style={styles.btnContainer}>
        {
          imageData ? <View style={styles.btnStyle}>
            <ManualButton title="Upload" onPress={() => uploadImage()} textStyle={{ color: 'white' }} />
          </View> : null}
        <View style={styles.btnStyle}>
          <ManualButton title="Select" textStyle={{ color: 'white' }} onPress={() => {
            Platform.OS === "ios" ? askForPermissions(PERMISSIONS.IOS.PHOTO_LIBRARY) : askForPermissions(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES)
            pickImage();
          }} />
        </View>
        {
          imgDeletePath ? <View style={styles.btnStyle}>
            <ManualButton title="Delete" onPress={() => deleteImage()} buttonStyle={{ backgroundColor: 'darkorange' }} textStyle={{ color: 'white' }} />

          </View> : null}
      </View>
      {
        imgDownUrl ? <View style={{ alignItems: 'center', marginVertical: RFPercentage(2) }}>
          <Image source={{ uri: imgDownUrl }} style={{ height: RFPercentage(10), width: RFPercentage(10) }} resizeMode='contain' />
        </View> : null
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: CommonStyles.Padding.paddingTop,
    paddingBottom: CommonStyles.Padding.paddingBottom,
    paddingHorizontal: RFPercentage(1),
  },
  headingText: {
    fontSize: RFPercentage(3),
    fontWeight: '700',
    textAlign: 'center',
    marginTop: RFPercentage(1),
    color: 'black'
  },

  btnContainer: {
    // flex: 1,
    flexDirection: 'row',
    marginVertical: RFPercentage(2),
    paddingHorizontal: RFPercentage(2)
    // backgroundColor: 'grey',
  },
  btnStyle: {
    flex: 1,
    marginHorizontal: RFPercentage(1)
  },
  imageContainer: {
    flex: 1,
    // backgroundColor: 'grey',
    marginTop: RFPercentage(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedImage: {
    height: '100%',
    width: '100%',
  }
});
