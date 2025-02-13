"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "../context/BookingContext";
import ProgressBar from "../../components/ProgressBar";

export default function TicketSelection() {
  const router = useRouter();
  const { updateBookingData } = useBooking();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const tickets = [
    { type: "Free", price: 0, label: "REGULAR ACCESS", available: "20/52" },
    { type: "$150", price: 150, label: "VIP ACCESS", available: "20/52" },
    { type: "$150", price: 150, label: "VVIP ACCESS", available: "20/52" },
  ];

  const handleNext = () => {
    if (selectedTicket === null) return;
    updateBookingData({
      ticket: tickets[selectedTicket],
      quantity: quantity,
    });
    router.push("/tickets/details");
  };

  return (
    <div className="container">
      <div style={{ display: "flex", flexDirection: "row", gap: "70%" }}>
        <h3>Ticket Selection</h3>
        <p>step 1/3</p>
      </div>
      <ProgressBar currentStep={1} totalSteps={3} />

      <div className="child-container">
        <div className="description-container">
          <h1>Techember Fest ’25</h1>
          <p>
            Join us for an unforgettable experience at [Event Name]! Secure your
            spot now.
          </p>
          <p>
            📍 [Event Location] || March 15, 2025 | 7:00 PM
          </p>
        </div>
        <p>Select Ticket type:</p>
        <div className="ticket-options">
          <div className="button-container">
            {tickets.map((ticket, index) => (
              <button
                key={index}
                className={selectedTicket === index ? "selected" : ""}
                onClick={() => setSelectedTicket(index)}
              >
                <p className="ticket-type">{ticket.type}</p>
                <p className="ticket-label">{ticket.label}</p>
                <p className="ticket-available">{ticket.available}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="custom-select-container">
          <label style={{ textAlign: "left" }}>Number of Tickets:</label>
          <select
            className="custom-select"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          >
            {[...Array(5).keys()].map((num) => (
              <option key={num} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="bottom-button">
          <button className="cancel-button">Cancel</button>
          <button
            disabled={selectedTicket === null}
            onClick={handleNext}
            className="next-button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
