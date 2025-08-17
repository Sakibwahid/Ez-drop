import { onCall, HttpsError } from "firebase-functions/v2/https";
import { onSchedule } from "firebase-functions/v2/scheduler";
import admin from "firebase-admin";

// Initialize Firebase Admin
admin.initializeApp();
const db = admin.database(); // get Realtime Database instance

// Create Session
export const createSession = onCall({ region: "asia-southeast1" }, async (request) => {
  const { text } = request.data;

  if (!text || typeof text !== "string") {
    throw new HttpsError("invalid-argument", "Text is required");
  }

  const pin = Math.floor(100000 + Math.random() * 900000).toString();

  await db.ref(`sessions/${pin}`).set({
    data: { text },
    createdAt: Date.now(),
  });

  return { pin };
});

// Get Session
export const getSession = onCall({ region: "asia-southeast1" }, async (request) => {
  const { pin } = request.data;

  if (!pin) throw new HttpsError("invalid-argument", "PIN is required");

  const snapshot = await db.ref(`sessions/${pin}`).once("value");

  if (!snapshot.exists()) {
    throw new HttpsError("not-found", "Session not found");
  }

  const session = snapshot.val();
  const now = Date.now();
  const expiryTime = 60 * 60 * 1000;

  if (now - session.createdAt > expiryTime) {
    await snapshot.ref.remove();
    throw new HttpsError("deadline-exceeded", "Session expired");
  }

  return { text: session.data.text };
});

// Clean Expired Sessions
export const cleanExpiredSessions = onSchedule(
  { schedule: "every 5 minutes", region: "asia-southeast1" },
  async () => {
    const now = Date.now();
    const expiryTime = 60 * 60 * 1000;

    const snapshot = await db.ref("sessions").once("value");
    snapshot.forEach((child) => {
      if (now - child.val().createdAt > expiryTime) {
        child.ref.remove();
      }
    });

    console.log("Expired sessions cleaned");
  }
);

