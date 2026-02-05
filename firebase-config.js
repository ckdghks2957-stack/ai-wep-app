// firebase-config.js
// IMPORTANT: Replace all placeholder values with your actual Firebase project configuration.
const firebaseConfig = {
  apiKey: "AIzaSyDuxnXy4rfowEYFbeq8F3McPCvJNvFUkQs", // Provided by user
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID" // Optional
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();