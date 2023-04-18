import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const reactNativeFirebaseConfig = {
  apiKey: 'AIzaSyBo6gt-LbQLDTm0Op1j7RjxPyPTQmXEQiA',
  authDomain: 'fir-tut-ee124.firebaseapp.com',
  projectId: 'fir-tut-ee124',
  storageBucket: 'fir-tut-ee124.appspot.com',
  GCM_SENDER_ID: '277454502150',
  appId: '1:277454502150:ios:7d5e573361612afb92c687',
}

firebase.initializeApp(reactNativeFirebaseConfig);
export const dataRef = firebase.database();
export default firebase;

