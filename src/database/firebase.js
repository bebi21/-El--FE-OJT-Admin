import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDWKlkjNrbblSWVxZzdpY7FVoCwWoBAcKY",
    authDomain: "project-m5-7b167.firebaseapp.com",
    databaseURL: "https://project-m5-7b167-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "project-m5-7b167",
    storageBucket: "project-m5-7b167.appspot.com",
    messagingSenderId: "792371730864",
    appId: "1:792371730864:web:8590ffbe124178939ade75",
    measurementId: "G-DT245EJFKC"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
