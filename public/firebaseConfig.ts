import { initializeApp } from 'firebase/app';
import { getAuth} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC2Mwb9HHQADyrvnMVmqa6LJuGSvtVz84Y",
    authDomain: "quizzify-1a36f.firebaseapp.com",
    databaseURL: "https://quizzify-1a36f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "quizzify-1a36f",
    storageBucket: "quizzify-1a36f.appspot.com",
    messagingSenderId: "196856463681",
    appId: "1:196856463681:web:ea2df69af7af79f52ca1c0",
    measurementId: "G-8TY5885660"
};

export const FIREBASE_APP = firebase.initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_ANALYTICS = getAnalytics(FIREBASE_APP);
