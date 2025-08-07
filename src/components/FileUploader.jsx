import React, { useState } from "react";
import axios from "axios";
import Button from "./Button";

export default function FileUploader({ onUpload }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://file.io/?expires=14d",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload response:", response.data);

      if (response.data.success && response.data.link) {
        onUpload(response.data.link);
      } else {
        setError("Upload failed: no link returned.");
      }
    } catch (err) {
      setError("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border border-gray-300 p-4 rounded max-w-md mx-auto space-y-4">
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
      />
      {error && <p className="text-red-600">{error}</p>}
      <Button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload & Generate QR"}
      </Button>
    </div>
  );
}
