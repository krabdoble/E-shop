// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth, GoogleAuthProvider} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClJokIgAMyWI6c9ONSOfmI7OpZ9VO3dnQ",
  authDomain: "proyecto-final-4483a.firebaseapp.com",
  projectId: "proyecto-final-4483a",
  storageBucket: "proyecto-final-4483a.firebasestorage.app",
  messagingSenderId: "810925991913",
  appId: "1:810925991913:web:a8e26919b9cc7dec360d78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider= new GoogleAuthProvider();