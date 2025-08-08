import { useState } from "react";
import Button from "./Button"; // adjust the path to your Button component

export default function SessionComponent({ error, handleJoin, loading, sessionData }) {
  return (
    <div className="p-4">
      {/* If there is NO session text yet → show the join form */}
      {!sessionData?.text ? (
        <>
          {error && <p className="text-red-600">{error}</p>}
          <Button onClick={handleJoin} disabled={loading}>
            {loading ? "Loading..." : "Join"}
          </Button>
        </>
      ) : (
        /* If there IS session text → show received text + copy button */
        <>
          <h3 className="font-semibold">Received Text:</h3>
          <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
            {sessionData.text}
          </pre>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(sessionData.text);
              alert("Copied to clipboard!");
            }}
          >
            Copy Text
          </Button>
        </>
      )}
    </div>
  );
}
