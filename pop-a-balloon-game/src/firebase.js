import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTZ2TYQ6BcRj8jDY7jShA2b9ZnrCQq9P0",
  authDomain: "pop-a-balloon-game-5444d.firebaseapp.com",
  projectId: "pop-a-balloon-game-5444d",
  storageBucket: "pop-a-balloon-game-5444d.appspot.com",
  messagingSenderId: "725623745386",
  appId: "1:725623745386:web:4e461d294f6ef673c89313"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();