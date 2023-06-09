// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCADWc3IuKoQiSKn5VhSG1cOoYbLOHwfj4",
  authDomain: "okr-frontend.firebaseapp.com",
  projectId: "okr-frontend",
  storageBucket: "okr-frontend.appspot.com",
  messagingSenderId: "746695881748",
  appId: "1:746695881748:web:2194879ac4050657342301"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);