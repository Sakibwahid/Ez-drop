import React, { useState } from "react";
import { ref, set } from "firebase/database";
import { database } from "../firebase";
import Button from "../components/Button";
import QRCodeDisplay from "../components/QRCodeDisplay";

function generatePin() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default function Sender() {
  const [text, setText] = useState("");
  const [pin, setPin] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleShare = () => {
    if (!text.trim()) return alert("Enter some text to share");

    const newPin = generatePin();
    setPin(newPin);

    // Save data to Firebase
    set(ref(database, `sessions/${newPin}`), {
      data: {
        text,
        // file: {}, // future extension placeholder
      },
      createdAt: Date.now(),
    });

    setShowOverlay(true);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
    setPin(null);
    setText("");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-[#FFFAFA] rounded shadow-md flex flex-col gap-6">
      <h2 className="text-2xl text-center font-bold">Write text</h2>
      <textarea
        placeholder="Enter text to share..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        className="border rounded p-3 resize-none"
      />
      {/* Placeholder for file upload here */}

      <Button onClick={handleShare}>Share</Button>

      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full relative">
            <h3 className="text-xl font-semibold mb-4">Share this PIN or QR code</h3>
            <div className="flex flex-col items-center gap-4">
              <QRCodeDisplay value={pin} />
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
