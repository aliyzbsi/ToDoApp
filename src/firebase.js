// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIzhwe9_vBmM7RA5t7T34sQYDAHlDPWlQ",
  authDomain: "todo-app-52684.firebaseapp.com",
  projectId: "todo-app-52684",
  storageBucket: "todo-app-52684.firebasestorage.app",
  messagingSenderId: "957835642565",
  appId: "1:957835642565:web:ee2a25a4367a57491692ac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
