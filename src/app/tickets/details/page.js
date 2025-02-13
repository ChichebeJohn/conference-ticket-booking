"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "../../context/BookingContext";
import ProgressBar from "../../../components/ProgressBar";
import ImageUpload from "../../../components/ImageUpload"; // Adjust path as needed

export default function AttendeeDetails() {
  const router = useRouter();
  const { updateBookingData } = useBooking();

  // Local states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  // Callback for ImageUpload component
  const handleAvatarUpload = (url) => {
    setImage(url);
  };

  const handleNext = () => {
    // Basic validation
    if (!name.trim() || !email.trim() || !image) {
      alert("Please fill in all fields and upload your avatar.");
      return;
    }

    // Save data to context
    updateBookingData({ attendee: { name, email, image, specialRequest } });

    // Move to confirmation page
    router.push("/tickets/confirmation");
  };

  const handleBack = () => {
    router.back(); // or router.push("/tickets") if you have a specific route
  };

  return (
    <div className="container">
    <div className="attendee-container">
      {/* Step Header */}
      <div className="attendee-header">
        <h2>Attendee Details</h2>
        <p>Step 2/3</p>
      </div>

      {/* Progress Bar */}
      <ProgressBar currentStep={2} totalSteps={3} />

      {/* Form Section */}
      <div className="form-container">
         <label>Upload Profile Photo</label> 
        <ImageUpload onUpload={handleAvatarUpload} />

        <label>Enter your name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Full Name"
        />

        <label>Enter your email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <label>Special request?</label>
        <textarea
          value={specialRequest}
          onChange={(e) => setSpecialRequest(e.target.value)}
          placeholder="Any special requests?"
          rows={3}
        />

        {/* Button Group */}
        <div className="bottom-button">
          <button id="back-btn" type="button" onClick={handleBack} className="cancel-button">
            Back
          </button>
          <button id="submit-btn" type="button" onClick={handleNext} className="next-button">
            Get My Free Ticket
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
