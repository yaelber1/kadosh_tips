import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDcIoWtVxvBCUpHRDoK9KW1618YHKPhiM0",
    authDomain: "kadosh-410b9.firebaseapp.com",
    databaseURL: "https://kadosh-410b9-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kadosh-410b9",
    storageBucket: "kadosh-410b9.appspot.com",
    messagingSenderId: "1071334115131",
    appId: "1:1071334115131:web:55f34517e18cd63885591e",
    measurementId: "G-W61J2X1BNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export default db;
