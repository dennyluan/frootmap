import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAsh2l3aV-0MwsRsEqw5OghXmoMTgXLPZc",
  authDomain: "frootmap.firebaseapp.com",
  projectId: "frootmap",
  storageBucket: "frootmap.appspot.com",
  messagingSenderId: "690778991895",
  appId: "1:690778991895:web:ae4a1b579f738ba5405b52",
  measurementId: "G-WJLGLHVTF9"
};

firebase.initializeApp(firebaseConfig);
export default firebase;