// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "webforge-ai-6b2e5.firebaseapp.com",
  projectId: "webforge-ai-6b2e5",
  storageBucket: "webforge-ai-6b2e5.firebasestorage.app",
  messagingSenderId: "315804220136",
  appId: "1:315804220136:web:943dfb45b049d3fc72275d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };