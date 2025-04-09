// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcyMD_dj_ItYnLIZPNmasEyx6N16djBIs",
  authDomain: "easytrip-88090.firebaseapp.com",
  projectId: "easytrip-88090",
  storageBucket: "easytrip-88090.firebasestorage.app",
  messagingSenderId: "20274301129",
  appId: "1:20274301129:web:93f89a1b87caf5054d2518",
  measurementId: "G-M3ZNV5Z1WP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);