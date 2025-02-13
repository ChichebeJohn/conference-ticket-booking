"use client";
import { useState } from "react";

export default function ImageUpload({ onUpload }) {
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (file) => {
    if (!file) return;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "avatars"); // Replace with your Cloudinary preset

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dmijtkbvn/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setImageUrl(data.secure_url);
      onUpload(data.secure_url); // Send URL to parent component
    } catch (error) {
      console.error("Upload failed:", error);
    }
    setUploading(false);
  };

  // File input change
  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    handleFileSelect(file);
  };

  // Drag & drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    handleFileSelect(file);
  };

  return (
    <div
      className="image-upload-container"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="image-upload-dropzone">
        {uploading ? (
          <p>Uploading...</p>
        ) : imageUrl ? (
          <img src={imageUrl} alt="Avatar preview" />
        ) : (
          <>
            <p className="dropzone-text">Drag &amp; drop or click to upload</p>
            <label className="browse-button">
              Browse
              <input
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                style={{ display: "none" }}
              />
            </label>
          </>
        )}
      </div>
    </div>
  );
}
