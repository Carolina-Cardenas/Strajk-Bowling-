import React from "react";
import BookingForm from "../components/BookingForm";
import "../styles/booking.css";

const Booking: React.FC = () => {
  return (
    <div className="page booking-page">
      <header className="booking-header">
        <div className="logo-small" />
      </header>
      <main>
        <h1 className="page-title">BOOKING</h1>
        <h3 className="page-subtitle">When, WHAT & Who</h3>
        <BookingForm />
      </main>
    </div>
  );
};

export default Booking;
