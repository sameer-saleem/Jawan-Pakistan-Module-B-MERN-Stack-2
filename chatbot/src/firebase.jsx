import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyChafNBE9E8Lvh4LEhBAL44jReoBavJzPQ",
  authDomain: "chatbot-60f68.firebaseapp.com",
  databaseURL: "https://chatbot-60f68-default-rtdb.firebaseio.com",
  projectId: "chatbot-60f68",
  storageBucket: "chatbot-60f68.firebasestorage.app",
  messagingSenderId: "180849927108",
  appId: "1:180849927108:web:e40fce42499f29350a3a91"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);