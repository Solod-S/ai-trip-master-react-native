import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-trip-master-a398c.firebaseapp.com",
  projectId: "ai-trip-master-a398c",
  storageBucket: "ai-trip-master-a398c.firebasestorage.app",
  messagingSenderId: "542255032689",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: "G-PH4XFBE3W4",
};
const app = initializeApp(firebaseConfig);

let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} catch (e) {
  if (e.code === "auth/already-initialized") {
    auth = getAuth(app); // If already initialized, use the existing auth instance
  } else {
    throw e; // Rethrow other errors
  }
}

const db = getFirestore(app);

export { auth, db };
