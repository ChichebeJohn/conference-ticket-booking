"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "../../context/BookingContext";
import ProgressBar from "../../../components/ProgressBar";
import ImageUpload from "../../../components/ImageUpload"; // Adjust path as needed

export default function AttendeeDetails() {
  const router = useRouter();
  const { updateBookingData } = useBooking();

  // State for form fields and errors
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [errors, setErrors] = useState({});

  // Load persisted state from localStorage on mount
  useEffect(() => {
    const storedName = localStorage.getItem("attendeeName");
    const storedEmail = localStorage.getItem("attendeeEmail");
    const storedImage = localStorage.getItem("attendeeImage");
    const storedSpecialRequest = localStorage.getItem("specialRequest");

    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
    if (storedImage) setImage(storedImage);
    if (storedSpecialRequest) setSpecialRequest(storedSpecialRequest);
  }, []);

  // Save form state changes to localStorage
  useEffect(() => {
    localStorage.setItem("attendeeName", name);
    localStorage.setItem("attendeeEmail", email);
    localStorage.setItem("attendeeImage", image);
    localStorage.setItem("specialRequest", specialRequest);
  }, [name, email, image, specialRequest]);

  // Callback for ImageUpload component
  const handleAvatarUpload = (url) => {
    setImage(url);
  };

  const validateEmail = (email) => {
    // Simple email regex for demonstration
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = () => {
    let valid = true;
    let tempErrors = {};
    if (!name.trim()) {
      tempErrors.name = "Name is required.";
      valid = false;
    }
    if (!email.trim()) {
      tempErrors.email = "Email is required.";
      valid = false;
    } else if (!validateEmail(email)) {
      tempErrors.email = "Please enter a valid email address.";
      valid = false;
    }
    if (!image) {
      tempErrors.image = "Avatar is required.";
      valid = false;
    }
    setErrors(tempErrors);
    return valid;
  };

  const handleNext = () => {
    if (!validateForm()) return;

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
          <div className="form-group">
            <label htmlFor="avatar-upload">Upload Profile Photo</label>
            <ImageUpload onUpload={handleAvatarUpload} id="avatar-upload" />
            {errors.image && (
              <span className="error" role="alert">
                {errors.image}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="full-name">Enter your name</label>
            <input
              id="full-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Full Name"
              aria-required="true"
            />
            {errors.name && (
              <span className="error" role="alert">
                {errors.name}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email-address">Enter your email</label>
            <input
              id="email-address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-required="true"
            />
            {errors.email && (
              <span className="error" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="special-request">Special Request?</label>
            <textarea
              id="special-request"
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              placeholder="Any special requests?"
              rows={3}
            />
          </div>

          {/* Button Group */}
          <div className="bottom-button">
            <button
              id="back-btn"
              type="button"
              onClick={handleBack}
              className="cancel-button"
              aria-label="Go back to Ticket Selection"
            >
              Back
            </button>
            <button
              id="submit-btn"
              type="button"
              onClick={handleNext}
              className="next-button"
              aria-label="Submit Attendee Details"
            >
              Get My Free Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
