import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCmVCIqbgk2wRyOr9WzA9O3E98nJGjwt4w",
  authDomain: "learnhub-d02e6.firebaseapp.com",
  projectId: "learnhub-d02e6",
  storageBucket: "learnhub-d02e6.firebasestorage.app",
  messagingSenderId: "426240568282",
  appId: "1:426240568282:web:ff055be14d0cd9b21d6ee3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

//TEST