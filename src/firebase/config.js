// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbWqytsutBZ-hv3PRbw_3mEVVb6kKuTvY",
  authDomain: "ace-of-beer.firebaseapp.com",
  projectId: "ace-of-beer",
  storageBucket: "ace-of-beer.firebasestorage.app",
  messagingSenderId: "631339717818",
  appId: "1:631339717818:web:b6ca7062261dde820d5e83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };