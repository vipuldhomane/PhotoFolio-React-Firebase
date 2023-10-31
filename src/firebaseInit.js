// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPJZmZYQFiB8ZJV3IbVRI2w4JASlUo83c",
  authDomain: "photofolio-52377.firebaseapp.com",
  projectId: "photofolio-52377",
  storageBucket: "photofolio-52377.appspot.com",
  messagingSenderId: "305451916808",
  appId: "1:305451916808:web:5884b4af96bfbfa1627bbd",
  measurementId: "G-BZMRRT0LJW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
