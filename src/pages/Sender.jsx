import React, { useState } from "react";
import Button from "../components/Button";
import QRCodeDisplay from "../components/QRCodeDisplay";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../firebase";

export default function Sender() {
  const [text, setText] = useState("");
  const [pin, setPin] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const functions = getFunctions(app);
  const createSession = httpsCallable(functions, "createSession");

  const BASE_URL = "https://ezdrop.netlify.app";
  const shareUrl = pin ? `${BASE_URL}/receiver?pin=${pin}` : "";

  const handleShare = async () => {
    if (!text.trim()) return alert("Enter some text to share");

    try {
      const result = await createSession({ text });
      setPin(result.data.pin);
      setShowOverlay(true);
    } catch (err) {
      console.error("Error creating session:", err);
      alert("Failed to create session. Please try again.");
    }
  };

  const closeOverlay = () => {
    setShowOverlay(false);
    setPin(null);
    setText("");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-[#FFFAFA] rounded shadow-md flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Sender</h2>
      <textarea
        placeholder="Enter text to share..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        className="border rounded p-3 resize-none"
      />

      <Button onClick={handleShare}>Share</Button>

      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full relative">
            <h3 className="text-xl font-semibold mb-4">Share this PIN or QR code</h3>
            <div className="flex flex-col items-center gap-4">
              <QRCodeDisplay value={shareUrl} />
              <div className="font-mono text-2xl select-all">{pin}</div>
              <Button onClick={closeOverlay} variant="secondary">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
