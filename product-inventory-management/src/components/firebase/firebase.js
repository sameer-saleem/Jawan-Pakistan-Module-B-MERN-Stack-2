import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCWi2jX7WNC1ZaCfgbNGwJ6ejR2otDCUDY",
  authDomain: "product-inventory-manage-47d71.firebaseapp.com",
  projectId: "product-inventory-manage-47d71",
  storageBucket: "product-inventory-manage-47d71.firebasestorage.app",
  messagingSenderId: "195455209326",
  appId: "1:195455209326:web:20fabae4b5884dd684fb7f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app);