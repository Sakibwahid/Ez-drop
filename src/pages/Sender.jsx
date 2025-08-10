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

  const handleShare = () => {
    if (!text.trim()) return alert("Enter some text to share");

    const newPin = generatePin();
    setPin(newPin);


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
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-[#ffff]  p-6 rounded shadow-lg max-w-sm w-full relative">
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
