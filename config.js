import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyAxQc_gPr622cSiftVL6hJEjinicQoV6k8",
    authDomain: "todoapp-a91f9.firebaseapp.com",
    projectId: "todoapp-a91f9",
    storageBucket: "todoapp-a91f9.appspot.com",
    messagingSenderId: "443536199728",
    appId: "1:443536199728:web:43d349aef0e43556c61df5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();