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
  const [storedBookingData, setStoredBookingData] = useState(null);

  useEffect(() => {
    // Check if new bookingData is provided (non-empty object)
    if (bookingData && Object.keys(bookingData).length > 0) {
      // Update state and localStorage with the new bookingData
      setStoredBookingData(bookingData);
      localStorage.setItem("ticketBookingData", JSON.stringify(bookingData));
    } else {
      // If bookingData is empty, try to load saved data from localStorage
      const storedData = localStorage.getItem("ticketBookingData");
      if (storedData) {
        setStoredBookingData(JSON.parse(storedData));
      }
    }

    // Update the purchase date each time bookingData changes (or on mount)
    setPurchaseDate(new Date().toLocaleString());
  }, [bookingData]);

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
    }
  };

  // Retrieve booking data from storedBookingData (fallback to an empty object)
  const attendee = storedBookingData?.attendee || {};
  const name = attendee.name || "Anonymous";
  const email = attendee.email || "no-email@example.com";
  const avatar = attendee.image || "/sample-avatar.png";
  const specialRequest = attendee.specialRequest || "None";

  const ticket = storedBookingData?.ticket || {};
  const ticketType = ticket.label || "Regular Access";

  // Example event info
  const eventName = "Techember Fest ’25";
  const eventDate = "📅 March 15, 2025 | ";
  const eventTime = "7:00 PM";
  const eventLocation = "📍 04 Rumens road, Ikoyi, Lagos";

  return (
    <div className="ticket-container">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "5px",
          padding: "10px",
          alignItems: "center",
        }}
      >
        <ProgressBar currentStep={3} totalSteps={3} />
        <p style={{ width: "100px" }}>Step 1/3</p>
      </div>
      <h1>Your Ticket is Booked!</h1>
      <p className="confirmation-subtext">
        Check your email for a copy or you can <span>download</span> it below.
      </p>

      {/* Ticket structure */}
      <div className="ticket" ref={ticketRef}>
        <div className="ticket-details">
          <h2>{eventName}</h2>
          <p>{eventLocation}</p>
          <p>
            {eventDate} &mdash; {eventTime}
          </p>

          {/* Attendee Avatar */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <div className="avatar-wrapper">
              <img src={avatar} alt="Attendee Avatar" />
            </div>
          </div>

          {/* Ticket & Event Details */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "20px",
              border: "1px solid #12464E",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
          <div
  style={{
    display: "flex",
    flexDirection: "row",
    width: "100%",
    // padding: "5px",
    overflow: "hidden",
  }}
>
  <div
    style={{
      flex: 1,
      minWidth: 0, // allows the div to shrink if necessary
      borderRight: "1px solid #12464E",
      borderBottom: "1px solid #12464E",
    }}
  >
    <p
      style={{
        margin: 0,
        overflow: "hidden",
        whiteSpace: "nowrap", // remove or change to "normal" if you want wrapping
        textOverflow: "ellipsis", // shows an ellipsis when text overflows
      }}
    >
      {name}
    </p>
  </div>
  <div
    style={{
      flex: 1,
      minWidth: 0,
      borderBottom: "1px solid #12464E",
    }}
  >
    <p
      style={{
        margin: 0,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      }}
    >
      {email}
    </p>
  </div>
</div>

            <p>
              Ticket Type:
              <br />
              <strong>{ticketType}</strong>
            </p>
<div style={{borderTop:"1px solid #12464E"}}>
            {specialRequest && specialRequest !== "None" && (
              <p>
               <span >Special Request:</span> {specialRequest}

              </p>
              
            )}
            </div>
          </div>
        </div>

        {/* Barcode */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <div className="barcode-wrapper">
            <Barcode
              value={email}
              width={0.8}
              height={50}
              margin={0}
              fontSize={14}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        className="bottom-button"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
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
