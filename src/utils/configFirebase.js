// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCe1pGTfSJIdmtSBYkb7MDH7FThXeg3zM",
  authDomain: "timeshare-client.firebaseapp.com",
  projectId: "timeshare-client",
  storageBucket: "timeshare-client.appspot.com",
  messagingSenderId: "479640119167",
  appId: "1:479640119167:web:bd984cfd72520ff5531c4a",
  measurementId: "G-65CP1D1XL9"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();
const storage = getStorage(app);
const db = getFirestore();

export { auth, providerGoogle, storage, db };
