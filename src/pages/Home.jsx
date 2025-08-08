import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button"; // adjust path if different

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Welcome to Ez-drop
      </h1>

      <div className="flex gap-4 w-full max-w-md">
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate("/create-session")}
          className="w-full"
        >
          Create Session
        </Button>

        <Button
          variant="secondary"
          size="lg"
          onClick={() => navigate("/join-session")}
          className="w-full"
        >
          Join Session
        </Button>
      </div>
    </div>
  );
}
