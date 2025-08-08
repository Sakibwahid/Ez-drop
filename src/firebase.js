// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDzZmT9ajBK7QXkutN2KwXjbO4J4OzVlNs",
  authDomain: "ez-drop-649e1.firebaseapp.com",
  databaseURL: "https://ez-drop-649e1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ez-drop-649e1",
  storageBucket: "ez-drop-649e1.appspot.com",
  messagingSenderId: "548892944690",
  appId: "1:548892944690:web:84b914fedd90faa0d7cf2b",
  measurementId: "G-87W3LKRWYN",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize and export Realtime Database instance
export const database = getDatabase(app);

