import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDq7TW5HItnjZby6yIj3yXorelMfZcPomc",
  authDomain: "lms-w-firebase.firebaseapp.com",
  projectId: "lms-w-firebase",
  storageBucket: "lms-w-firebase.firebasestorage.app",
  messagingSenderId: "89253460532",
  appId: "1:89253460532:web:d8f68527f196218327e861"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);