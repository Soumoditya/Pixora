// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Note: we won't import firebase storage if you cannot use it

const firebaseConfig = {
  apiKey: "AIzaSyB8NXsEwUvNU3gJecs8acHd3X2dT8deAq0",
  authDomain: "pixora-web.firebaseapp.com",
  projectId: "pixora-web",
  storageBucket: "pixora-web.appspot.com", // use appspot.com
  messagingSenderId: "529818857931",
  appId: "1:529818857931:web:7b799c7444ddfe7a86064e",
  measurementId: "G-EET4T288CX"
};

const app = initializeApp(firebaseConfig);
try { getAnalytics(app); } catch (e) { /* ok in many envs */ }

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// CLOUDINARY: set these values after you create an unsigned preset
export const USE_CLOUDINARY = true;
export const CLOUDINARY = {
  cloudName: "REPLACE_WITH_YOUR_CLOUD_NAME",
  unsignedPreset: "REPLACE_WITH_UNSIGNED_PRESET"
};
