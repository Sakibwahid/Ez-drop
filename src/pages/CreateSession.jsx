import React, { useEffect, useState, useRef } from "react";
import { ref, set, onValue, remove } from "firebase/database";
import { database } from "../firebase"; // adjust path if needed
import Button from "../components/Button";
import QRCodeDisplay from "../components/QRCodeDisplay";

function generatePin() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default function CreateSession() {
  const [pin, setPin] = useState("");
  const [copied, setCopied] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const currentSessionRef = useRef(null);

  // Helper to create session in Firebase and listen for updates
  const createFirebaseSession = (newPin) => {
    // Remove old session if exists
    if (currentSessionRef.current) {
      remove(currentSessionRef.current).catch(() => {});
    }

    const sessionRef = ref(database, "sessions/" + newPin);
    currentSessionRef.current = sessionRef;

    set(sessionRef, {
      createdAt: Date.now(),
      messages: [],
    })
      .then(() => {
        onValue(sessionRef, (snapshot) => {
          setSessionData(snapshot.val());
        });
      })
      .catch((error) => {
        console.error("Error creating session:", error);
      });
  };

  // Initialize session on mount
  useEffect(() => {
    const newPin = generatePin();
    setPin(newPin);
    createFirebaseSession(newPin);

    // Cleanup on unmount
    return () => {
      if (currentSessionRef.current) {
        remove(currentSessionRef.current).catch(() => {});
      }
    };
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const regeneratePin = () => {
    const newPin = generatePin();
    setPin(newPin);
    createFirebaseSession(newPin);
  };

  const qrPayload = JSON.stringify({ sessionId: pin });

  return (
    <div className="flex flex-col items-center gap-6 p-6 rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-2xl font-bold text-gray-800">Create Session</h2>

      <QRCodeDisplay value={qrPayload} />

      <div className="flex items-center gap-4">
        <span className="text-xl font-mono tracking-widest">{pin}</span>
        <Button variant="primary" size="sm" onClick={copyToClipboard}>
          {copied ? "Copied!" : "Copy PIN"}
        </Button>
      </div>

      <div className="flex gap-4">
        <Button variant="primary" size="md" onClick={() => alert("Start sharing! Hook your sharing logic here")}>
          Start Sharing
        </Button>
        <Button variant="secondary" size="md" onClick={regeneratePin}>
          Regenerate PIN
        </Button>
      </div>

      {/* Optional debug info */}
      <pre className="mt-4 text-xs bg-gray-100 p-2 rounded w-full overflow-auto">
        {JSON.stringify(sessionData, null, 2)}
      </pre>
    </div>
  );
}
