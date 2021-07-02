import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA1nuICRTKZh-QBSG5g-zrizy5QIijdGY8",
  authDomain: "codergilbert.firebaseapp.com",
  projectId: "codergilbert",
  storageBucket: "codergilbert.appspot.com",
  messagingSenderId: "790516466440",
  appId: "1:790516466440:web:cabb6bc1e1d98ad4b9e2bd",
  measurementId: "G-GQHM92W74Z",
};

firebase.initializeApp(firebaseConfig);
export const analytics = firebase.analytics();
