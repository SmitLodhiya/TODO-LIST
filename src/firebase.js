// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdpvoJoGDZz23j_fXSahVPWjdg2IwVWy0",
  authDomain: "todo-f809a.firebaseapp.com",
  projectId: "todo-f809a",
  storageBucket: "todo-f809a.appspot.com",
  messagingSenderId: "543334496149",
  appId: "1:543334496149:web:e7b9275c7ce0a39234289c",
  measurementId: "G-ELQW1QPFC7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
export {auth};