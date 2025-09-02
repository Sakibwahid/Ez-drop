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
  const [textsend, setoption] = useState(true);
  const BASE_URL = "https://ezdrop.netlify.app"; // your real deployed URL
  const shareUrl = `${BASE_URL}/receiver?pin=${pin}`;

  const handleShare = () => {
  if (!text.trim()) return alert("Enter some text to share");

  const newPin = generatePin();
  setPin(newPin);

  const now = Date.now();
  const expiresIn = 5 * 60 * 1000; // 5 minutes, adjust as needed

 set(ref(database, `sessions/${newPin}`), {
  pin: newPin,        // <--- must match the path
  data: { text },
  createdAt: now,
  expiresAt: now + expiresIn
});

  setShowOverlay(true);
};

  const closeOverlay = () => {
    setShowOverlay(false);
    setPin(null);
    setText("");
  };

  return (
    <div className="mx-2 w-md p-6 bg-[#FFFAFA] rounded shadow-md flex flex-col gap-4 items-center justify-between">
      <div className="flex items-center gap-2 mb-2">
        <Button
          variant={null}
          onClick={() => setoption(true)}
          className={`rounded-none border-b-4 transition-colors duration-300 ease-in-out ${textsend ? "border-blue-600" : "border-transparent"
            } `}
        >
          Text
        </Button>

        <Button
          variant={null}
          onClick={() => setoption(false)}
          className={`rounded-none border-b-4 transition-colors duration-300 ease-in-out ${!textsend ? "border-blue-600" : "border-transparent"
            } `}
        >
          File
        </Button>
      </div>

      <div className="w-full">
        {textsend && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl text-center font-bold">Write text</h2>
            <textarea
              placeholder="Enter text to share..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              className="border rounded p-3 resize-none"
            />
          </div>
        )}

        {!textsend && (
          <div>
            <h2 className="text-2xl text-center font-bold">Upload file</h2>
          </div>
        )}
      </div>

      <Button onClick={handleShare}>Share</Button>

      {showOverlay && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-sm p-6 relative animate-fadeIn">
            <h3 className="text-2xl font-bold text-center mb-6">Share this PIN or QR code</h3>

            <div className="flex flex-col items-center gap-6">
              <div className="p-4 rounded-xl bg-gray-50 shadow-inner">
                <QRCodeDisplay value={shareUrl} />
              </div>

              <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-mono text-3xl font-bold tracking-widest select-all shadow">
                {pin}
              </div>

              <Button onClick={closeOverlay} variant="secondary" className="mt-4 w-full">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
