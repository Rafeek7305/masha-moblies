import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDg9EZuHjyHW72fhNDDwPqnN490eEilHRs",
  authDomain: "masha-mobiles-18f67.firebaseapp.com",
  projectId: "masha-mobiles-18f67",
  storageBucket: "masha-mobiles-18f67.firebasestorage.app",
  messagingSenderId: "404167929360",
  appId: "1:404167929360:web:076c37ec1c571d1427a495",
  measurementId: "G-3RY18NSZ67"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);