import { REACT_APP_FIREBASE_API_KEY, 
        REACT_APP_FIREBASE_AUTH_DOMAIN,
        REACT_APP_FIREBASE_DATABASE_URL, 
        REACT_APP_FIREBASE_PROJECT_ID, 
        REACT_APP_FIREBASE_STORAGE_BUCKET, 
        REACT_APP_FIREBASE_MESSAGING_SENDER_ID, 
        REACT_APP_FIREBASE_APP_ID, 
        REACT_APP_FIREBASE_MEASUREMENT_ID 
    } from "@env";

import { getAuth} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app'
import { getStorage } from 'firebase/storage'
import 'firebase/compat/firestore'

// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: REACT_APP_FIREBASE_API_KEY,
    authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
    projectId: REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: REACT_APP_FIREBASE_APP_ID,
    measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export const FIREBASE_APP = firebase.initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_ANALYTICS = getAnalytics(FIREBASE_APP);
export const FIRESTORE = firebase.firestore();
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
