// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB4vXJFfm3u_bckedeka7xRLeHhSxiX9uo",
    authDomain: "try-work-1703b.firebaseapp.com",
    projectId: "try-work-1703b",
    storageBucket: "try-work-1703b.firebasestorage.app",
    messagingSenderId: "563655554169",
    appId: "1:563655554169:web:ddf8755fe16a2b5e8ed0a8",
    measurementId: "G-HM1DEPGV1N"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }