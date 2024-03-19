import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCTmBsBl1tbK1qnPEYfuQGBRHCU_Zop2fk",
  authDomain: "share-egypt.firebaseapp.com",
  projectId: "share-egypt",
  storageBucket: "share-egypt.appspot.com",
  messagingSenderId: "818412361946",
  appId: "1:818412361946:web:ff8073d0bf1331a580ade3",
  // measurementId: "G-56QG498PG4"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = getAuth(firebaseApp);

export { auth, db };

