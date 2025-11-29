// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // ← THIS IS FIRESTORE (NOT getDatabase!)

const firebaseConfig = {
  apiKey: "AIzaSyCTZ2TYQ6BcRj8jDY7jShA2b9ZnrCQq9P0", // your real key here
  authDomain: "pop-a-balloon-game-5444d.firebaseapp.com",
  projectId: "pop-a-balloon-game-5444d",
  storageBucket: "pop-a-balloon-game-5444d.appspot.com",
  messagingSenderId: "725623745386",
  appId: "1:725623745386:web:4e461d294f6ef673c89313"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export correct services
export const auth = getAuth(app);
export const db = getFirestore(app);        // ← FIRESTORE (this fixes everything)
export const googleProvider = new GoogleAuthProvider();