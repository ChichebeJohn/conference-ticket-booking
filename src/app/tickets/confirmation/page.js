"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "../../context/BookingContext";
import ProgressBar from "../../../components/ProgressBar";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";
import "../../globals.css";

export default function TicketConfirmation() {
  const { bookingData } = useBooking();
  const router = useRouter();
  const ticketRef = useRef(null);

  // Set purchase date/time on mount
  const [purchaseDate, setPurchaseDate] = useState("");
  useEffect(() => {
    setPurchaseDate(new Date().toLocaleString());
  }, []);

  // Download the ticket as an image
  const handleDownload = async () => {
    try {
      if (ticketRef.current) {
        const canvas = await html2canvas(ticketRef.current);
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "ticket.png";
        link.click();
      }
    } catch (error) {
      console.error("Error downloading ticket:", error);
      // Optionally provide user feedback here
    }
  };

  // Retrieve booking data
  const attendee = bookingData.attendee || {};
  const name = attendee.name || "Anonymous";
  const email = attendee.email || "no-email@example.com";
  const avatar = attendee.image || "/sample-avatar.png";
  const specialRequest = attendee.specialRequest || "None";

  const ticket = bookingData.ticket || {};
  const ticketType = ticket.label || "Regular Access";

  // Example event info
  const eventName = "Techember Fest ’25";
  const eventDate = "March 15, 2025";
  const eventTime = "7:00 PM";
  const eventLocation = "Lagos, Nigeria";

  return (
    <div className="ticket-confirmation-container">
      <ProgressBar currentStep={3} totalSteps={3} />
      <h1>Your Ticket is Booked!</h1>
      <p className="confirmation-subtext">
        Check your email for a copy or you can <span>download</span> it below.
      </p>

      {/* Ticket structure arranged vertically */}
      <div className="ticket" ref={ticketRef}>
        {/* Top Section: Attendee Avatar */}
        <div className="ticket--start">
          <div className="avatar-wrapper">
            <img src={avatar} alt="Attendee Avatar" />
          </div>
        </div>

        {/* Center Section: Ticket & Event Details */}
        <div className="ticket--center">
          <h2>{eventName}</h2>
          <p>
            <strong>Date:</strong> {eventDate} &mdash; {eventTime}
          </p>
          <p>
            <strong>Location:</strong> {eventLocation}
          </p>
          <p>
            <strong>Ticket Type:</strong> {ticketType}
          </p>
          <p>
            <strong>Ordered on:</strong> {purchaseDate} by {name} ({email})
          </p>
          {specialRequest && specialRequest !== "None" && (
            <p>
              <strong>Special Request:</strong> {specialRequest}
            </p>
          )}
        </div>

        {/* Bottom Section: Barcode & Optional Logo */}
        <div className="ticket--end">
          <div className="barcode-wrapper">
            <Barcode value={email} width={0.8} height={50} margin={0} fontSize={14} />
          </div>
          
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bottom-button">
        <button
          onClick={handleDownload}
          className="cancel-button"
          aria-label="Download Ticket as Image"
        >
          Download Ticket
        </button>
        <button
          onClick={() => router.push("/tickets")}
          className="next-button"
          aria-label="Book Another Ticket"
        >
          Book Another Ticket
        </button>
      </div>
    </div>
  );
}
