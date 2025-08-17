<<<<<<< Updated upstream
=======
import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { useSearchParams } from "react-router-dom";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../firebase";

export default function Receiver() {
  const [searchParams] = useSearchParams();
  const [pinInput, setPinInput] = useState("");
  const [error, setError] = useState("");
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(false);

  const functions = getFunctions(app);
  const getSession = httpsCallable(functions, "getSession");

  useEffect(() => {
    const pinFromUrl = searchParams.get("pin");
    if (pinFromUrl && /^\d{6}$/.test(pinFromUrl)) {
      setPinInput(pinFromUrl);
      handleJoin(pinFromUrl);
    }
  }, [searchParams]);

  const handleJoin = async (pinOverride) => {
    const pin = pinOverride || pinInput;

    if (!/^\d{6}$/.test(pin)) {
      setError("Please enter a valid 6-digit PIN.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const result = await getSession({ pin });
      setSessionData(result.data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load session data.");
      setSessionData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-2 w-md p-6 bg-[#FFFAFA] rounded shadow-md flex flex-col gap-4 items-center">
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
          <Button onClick={() => handleJoin()} disabled={loading}>
            {loading ? "Loading..." : "Join"}
          </Button>
        </>
      ) : (
        <>
          <h3 className="font-semibold">Received Text:</h3>
          <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
            {sessionData.text}
          </pre>
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

>>>>>>> Stashed changes
