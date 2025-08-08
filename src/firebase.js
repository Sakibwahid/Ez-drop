// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzZmT9ajBK7QXkutN2KwXjbO4J4OzVlNs",
  authDomain: "ez-drop-649e1.firebaseapp.com",
  databaseURL: "https://ez-drop-649e1-default-rtdb.firebaseio.com",  // Add this line if missing
  projectId: "ez-drop-649e1",
  storageBucket: "ez-drop-649e1.appspot.com",
  messagingSenderId: "548892944690",
  appId: "1:548892944690:web:84b914fedd90faa0d7cf2b",
  measurementId: "G-87W3LKRWYN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
