import firebase from "firebase/compat/app"
import "firebase/compat/storage"
import "firebase/compat/firestore"

export const app = firebase.initializeApp({
    // "projectId": "fir-storage-9d162",
    // "appId": "1:341556277320:web:faede561b3c8195f34687d",
    // "storageBucket": "fir-storage-9d162.appspot.com",
    // "locationId": "us-central",
    // "apiKey": "AIzaSyAV-ODEdvRXyUuCXtUbw79KacSLGPDCmB0",
    // "authDomain": "fir-storage-9d162.firebaseapp.com",
    // "messagingSenderId": "341556277320"


    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
  });
  

  