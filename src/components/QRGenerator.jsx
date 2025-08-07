import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import QRCodeDisplay from "./QRCodeDisplay";


export default function QRGenerator() {
  const [text, setText] = useState("");
  const [qrValue, setQrValue] = useState("");

  const handleGenerate = () => {
    if (text.trim()) {
      setQrValue(text);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4 p-4">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text, URL, or file link"
      />
      <Button onClick={handleGenerate}>Generate QR</Button>
      <QRCodeDisplay value={qrValue} />
    </div>
  );
}
