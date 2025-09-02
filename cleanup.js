// cleanup.js (self-contained)
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, remove } from "firebase/database";

// ---- Firebase config ----
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

// ---- Initialize Firebase ----
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ---- Cleanup function ----
async function cleanup() {
  try {
    const snapshot = await get(ref(database, "sessions"));
    const sessions = snapshot.val() || {};

    const now = Date.now();

    for (const pin in sessions) {
      const session = sessions[pin];
      if (session.expiresAt && session.expiresAt < now) {
        await remove(ref(database, `sessions/${pin}`));
        console.log(`Deleted expired session: ${pin}`);
      }
    }

    console.log("Cleanup complete!");
  } catch (err) {
    console.error("Error during cleanup:", err);
  }
}

// ---- Run cleanup ----
cleanup();

