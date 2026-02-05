// firebase-config.js
// IMPORTANT: This file contains your Firebase project configuration.
// Do not share this file publicly or commit it to a public repository without careful consideration.
const firebaseConfig = {
  apiKey: "AIzaSyDWVf1GFClmuqeL78WRgRcmuBDtWUs5gwY",
  authDomain: "ai-vibe-coding-test1.firebaseapp.com",
  projectId: "ai-vibe-coding-test1",
  storageBucket: "ai-vibe-coding-test1.firebasestorage.app",
  messagingSenderId: "856330281090",
  appId: "1:856330281090:web:d10130aaf87293eda4949b",
  measurementId: "G-E4PNTGCB7M"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();