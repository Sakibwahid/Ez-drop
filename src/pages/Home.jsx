import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Make sure global styles are imported

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="app-bg flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Ez Drop</h1>
      <p className="text-gray-600 text-center max-w-md mb-8">
        Welcome to <span className="font-semibold">Ez Drop</span> — a fast and
        seamless way to share files between devices. Choose a role to get started.
      </p>
      <div className="flex gap-6">
        <Button className="px-6 py-3 text-lg" onClick={() => navigate("/sender")}>
          📤 Sender
        </Button>
        <Button className="px-6 py-3 text-lg" onClick={() => navigate("/receiver")}>
          📥 Receiver
        </Button>
      </div>
    </div>
  );
}
