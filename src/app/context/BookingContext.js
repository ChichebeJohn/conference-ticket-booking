"use client";
import { createContext, useState, useContext } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookingData, setBookingData] = useState({
    ticket: null,
    quantity: 1,
    attendee: {
      name: "",
      email: "",
      image: null,
    },
  });

  // Use this function to merge new data into the current booking data.
  const updateBookingData = (data) => {
    setBookingData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  return (
    <BookingContext.Provider value={{ bookingData, updateBookingData }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
