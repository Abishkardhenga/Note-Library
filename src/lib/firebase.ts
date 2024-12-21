import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyDZqexG1D16jZabqq2Fc6NXFrf24ojcBYc",
//   authDomain: "bolt-1447a.firebaseapp.com",
//   projectId: "bolt-1447a",
//   storageBucket: "bolt-1447a.appspot.com",
//   messagingSenderId: "315049398775",
//   appId: "1:315049398775:web:97b68169d5f956b1e01ef2"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAgdALOGjq7ziQ3vnyhapwnezC--iHglFk",
  authDomain: "note-library-3f0e9.firebaseapp.com",
  projectId: "note-library-3f0e9",
  storageBucket: "note-library-3f0e9.firebasestorage.app",
  messagingSenderId: "613865924191",
  appId: "1:613865924191:web:6693d1c21ea787fa56ddea",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);