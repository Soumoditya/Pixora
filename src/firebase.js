// Firebase helper with your provided SDK config
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB8NXsEwUvNU3gJecs8acHd3X2dT8deAq0",
  authDomain: "pixora-web.firebaseapp.com",
  projectId: "pixora-web",
  storageBucket: "pixora-web.firebasestorage.app",
  messagingSenderId: "529818857931",
  appId: "1:529818857931:web:7b799c7444ddfe7a86064e",
  measurementId: "G-EET4T288CX"
};

const app = initializeApp(firebaseConfig);
try { getAnalytics(app); } catch (e) { /* analytics may fail in some envs */ }

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Note: if Firebase Storage is not configured/available in your project console,
// set USE_CLOUDINARY = true below to use Cloudinary (instructions later)
export const storage = (() => {
  try {
    return getStorage(app);
  } catch (e) {
    return null;
  }
})();
export const USE_CLOUDINARY = false;
