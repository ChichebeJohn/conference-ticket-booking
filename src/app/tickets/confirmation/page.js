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

  // Generate purchase date/time on mount
  const [purchaseDate, setPurchaseDate] = useState("");
  useEffect(() => {
    const now = new Date();
    setPurchaseDate(now.toLocaleString());
  }, []);

  // Download the ticket as an image
  const handleDownload = async () => {
    if (ticketRef.current) {
      const canvas = await html2canvas(ticketRef.current);
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "ticket.png";
      link.click();
    }
  };

  // Retrieve data from the booking context
  const attendee = bookingData.attendee || {};
  const name = attendee.name || "Anonymous";
  const email = attendee.email || "no-email@example.com";
  const avatar = attendee.image || "/sample-avatar.png";
  const specialRequest = attendee.specialRequest || "None";

  // Ticket details from context (if available)
  const ticket = bookingData.ticket || {};
  const ticketType = ticket.label || "Regular Access";

  // Example event info (replace with your real data)
  const eventName = "Techember Fest ’25";
  const eventDate = "March 15, 2025";
  const eventTime = "7:00 PM";
  const eventLocation = "Lagos, Nigeria";

  return (
    <div className="container">
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
          <div style={{border:"5px solid #0E464F", borderRadius:"5px", width:"140px", height:"140px", marginLeft:"45%", marginTop:"10%"}}>
        <img src={avatar} alt="Attendee Avatar" style={{ width: "140px", height: "140px", borderRadius: "0" }} />
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
        </div>

        {/* Bottom Section: Barcode & Logo */}
        <div className="ticket--end">
          <div style={{ marginBottom: "1rem" }}>
            <Barcode value={email} />
          </div>
          <div>
            {/* <img src="https://qidoon.com/assets/img/logo.svg" alt="Company Logo" style={{ maxWidth: "120px" }} /> */}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bottom-button" style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
        <button onClick={handleDownload} className="cancel-button">Download Ticket</button>
        <button onClick={() => router.push("/tickets")} className="next-button">Book Another Ticket</button>
      </div>
    </div>
    </div>
  );
}
