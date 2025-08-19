import React, { useState, useEffect } from "react";
import { ref, get, onValue } from "firebase/database";
import { database } from "../firebase";
import Button from "../components/Button";
import { useSearchParams } from "react-router-dom";

export default function Receiver() {
  const [searchParams] = useSearchParams();
  const [pinInput, setPinInput] = useState("");
  const [error, setError] = useState("");
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(false);

  // On page load: check if URL has a valid ?pin=XXXXXX
  useEffect(() => {
    const pinFromUrl = searchParams.get("pin");
    if (pinFromUrl && /^\d{6}$/.test(pinFromUrl)) {
      setPinInput(pinFromUrl);
    }
  }, [searchParams]);

  // Fetch data whenever pinInput changes and is valid
  useEffect(() => {
    if (!pinInput.match(/^\d{6}$/)) return;

    setError("");
    setLoading(true);

    get(ref(database, `sessions/${pinInput}/data`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setSessionData(snapshot.val());
        } else {
          setError("No data found for this PIN.");
          setSessionData(null);
        }
      })
      .catch(() => {
        setError("Failed to load session data.");
        setSessionData(null);
      })
      .finally(() => setLoading(false));
  }, [pinInput]);

  // Listen for realtime updates after initial load
  useEffect(() => {
    if (!pinInput || !sessionData) return;

    const dataRef = ref(database, `sessions/${pinInput}/data`);
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        setSessionData(snapshot.val());
      }
    });

    return () => unsubscribe();
  }, [pinInput, sessionData]);

  // Manual join button triggers re-check
  const handleJoin = () => {
    if (!pinInput.match(/^\d{6}$/)) {
      setError("Please enter a valid 6-digit PIN.");
      return;
    }
    setError("");
    // The fetch effect will run automatically
  };

  return (
    <div className="max-w-lg mx-auto p-6 rounded shadow-md flex flex-col justify-center items-center gap-6">
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

