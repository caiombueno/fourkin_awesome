// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC_tbrO8CqHq1nwhwAZ4er_VS8LKF44LRQ",
    authDomain: "fourkinawesome.firebaseapp.com",
    projectId: "fourkinawesome",
    storageBucket: "fourkinawesome.appspot.com",
    messagingSenderId: "158340021056",
    appId: "1:158340021056:web:bdfc7da67d971021a898a5",
    measurementId: "G-80LV1GMKF3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app); 