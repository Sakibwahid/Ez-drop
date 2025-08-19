import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Make sure global styles are imported

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      <div className="flex items-center mb-6 animate-bounce">
  
        <h1 className="text-4xl md:text-6xl font-bold text-gray-600">Ez-Drop</h1>
      </div>

      <p className="text-xl text-gray-700 text-center max-w-xl mb-10">
       a fast and
      seamless way to share files between devices. Choose your role to get started.
      </p>
      <div className="flex gap-4">
        <Button
          className="px-6 py-4 text-lg font-semibold bg-primary text-white rounded-lg shadow hover:bg-primary-dark transition"
          onClick={() => navigate("/sender")}
        >
          📤 Sender
        </Button>
        <Button
          className="px-6 py-4 text-lg font-semibold bg-secondary text-white rounded-lg shadow hover:bg-secondary-dark transition"
          onClick={() => navigate("/receiver")}
        >
          📥 Receiver
        </Button>
      </div>
    </div>
  );
}
