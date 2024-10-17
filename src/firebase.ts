import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBCoAkU5tMXa7a_12ok9kZHgUv-sPNt450",
  authDomain: "notes-799ad.firebaseapp.com",
  projectId: "notes-799ad",
  storageBucket: "notes-799ad.appspot.com",
  messagingSenderId: "462169503217",
  appId: "1:462169503217:web:1b5fb4ac9a2f0dd6cf8050",
  measurementId: "G-MP27PCK7YQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);