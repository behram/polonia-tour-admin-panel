import firebase from "firebase";
import "firebase/firestore";

// Initialize Firebase

var config = {
  apiKey: "AIzaSyAm4MQMpTuVh-TUxu-j3q0KAVJZ7ZllzCU",
  authDomain: "poloniat-d76bf.firebaseapp.com",
  databaseURL: "https://poloniat-d76bf.firebaseio.com",
  projectId: "poloniat-d76bf",
  storageBucket: "poloniat-d76bf.appspot.com",
  messagingSenderId: "910563882699"
};
firebase.initializeApp(config);

export default firebase;
