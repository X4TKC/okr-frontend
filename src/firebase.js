// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtVP-v97p-kZpc01nir55VkmGc8NZTMVc",
  authDomain: "okr-project-ac0ff.firebaseapp.com",
  projectId: "okr-project-ac0ff",
  storageBucket: "okr-project-ac0ff.appspot.com",
  messagingSenderId: "110885897777",
  appId: "1:110885897777:web:5f390920a52e1679477710"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
