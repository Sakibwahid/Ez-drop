import React from "react";
import QRCode from "react-qr-code";

export default function QRCodeDisplay({ value }) {
  if (!value) return null;
  return (
    <div className="flex justify-center p-4 bg-white rounded shadow">
      <QRCode value={value} size={200} />
    </div>
  );
}
