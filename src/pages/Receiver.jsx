import React, { useState, useEffect } from "react";
import { ref, get, onValue } from "firebase/database";
import { database } from "../firebase";
import Button from "../components/Button";

export default function Receiver() {
  const [pinInput, setPinInput] = useState("");
  const [error, setError] = useState("");
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!pinInput.match(/^\d{6}$/)) {
      setError("Please enter a valid 6-digit PIN.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const snapshot = await get(ref(database, `sessions/${pinInput}/data`));
      if (snapshot.exists()) {
        setSessionData(snapshot.val());
      } else {
        setError("No data found for this PIN.");
        setSessionData(null);
      }
    } catch (e) {
      setError("Failed to load session data.");
      setSessionData(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!sessionData) return;

    const dataRef = ref(database, sessions/${pinInput}/data);
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        setSessionData(snapshot.val());
      }
    });

    return () => unsubscribe();
  }, [pinInput, sessionData]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-[#FFFAFA] rounded shadow-md flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Receiver</h2>
      {!sessionData ? (
        <>
          <input
            type="text"
            placeholder="Enter PIN"
            maxLength={6}
            className="border p-2 rounded"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
          />
          {error && <p className="text-red-600">{error}</p>}
          <Button onClick={handleJoin} disabled={loading}>
            {loading ? "Loading..." : "Join"}
          </Button>
        </>
      ) : (
        <>
          <h3 className="font-semibold">Received Text:</h3>
          <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{sessionData.text}</pre>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(sessionData.text);
              alert("Copied to clipboard!");
            }}
          >
            Copy Text
          </Button>
        </>
      )}
    </div>
  );
}