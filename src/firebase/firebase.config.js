// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, update, set } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
};

const initApp = initializeApp(firebaseConfig);
const firebaseDb = getDatabase(initApp);

const firebaseUtils ={
  firebaseDb,
  ref,
  onValue,
  update,
  set
}

export default firebaseUtils;
