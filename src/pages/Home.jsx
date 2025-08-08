import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 ">
      <h1 className="text-3xl font-bold">Clipboard Bridge</h1>
      <div className="flex gap-6">
        <Button onClick={() => navigate("/sender")}>Sender</Button>
        <Button onClick={() => navigate("/receiver")}>Receiver</Button>
      </div>
    </div>
  );
}
