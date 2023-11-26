// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFu5soGeCRdZIDPYyQL7jVBMrAYLPLgXk",
  authDomain: "yotube-422d1.firebaseapp.com",
  projectId: "yotube-422d1",
  storageBucket: "yotube-422d1.appspot.com",
  messagingSenderId: "507183558726",
  appId: "1:507183558726:web:e4c134b728962e2eec5a47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;