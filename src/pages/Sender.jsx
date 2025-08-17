import React, { useState } from "react";
import Button from "../components/Button";
import QRCodeDisplay from "../components/QRCodeDisplay";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../firebase";

export default function Sender() {
  const [text, setText] = useState("");
  const [pin, setPin] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
<<<<<<< Updated upstream
=======

  const functions = getFunctions(app);
  const createSession = httpsCallable(functions, "createSession");

  const BASE_URL = "https://ezdrop.netlify.app"; 
  const shareUrl = pin ? `${BASE_URL}/receiver?pin=${pin}` : "";
>>>>>>> Stashed changes

  const handleShare = async () => {
    if (!text.trim()) return alert("Enter some text to share");

<<<<<<< Updated upstream
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
      <h2 className="text-2xl font-bold">Sender</h2>
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
=======
    try {
      const result = await createSession({ text });
      setPin(result.data.pin);
      setShowOverlay(true);
    } catch (err) {
      console.error(err);
      alert("Failed to create session. Please try again.");
    }
  };

  return (
    <div className="mx-2 w-md p-6 bg-[#FFFAFA] rounded shadow-md flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Sender</h2>

      <textarea
        placeholder="Enter text here..."
        className="border p-2 rounded w-full"
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <Button onClick={handleShare}>Share</Button>

      {showOverlay && pin && (
        <div className="mt-4">
          <p className="font-semibold">PIN: {pin}</p>
          <QRCodeDisplay value={shareUrl} />
          <p className="text-sm text-gray-500">{shareUrl}</p>
>>>>>>> Stashed changes
        </div>
      )}
    </div>
  );
}
