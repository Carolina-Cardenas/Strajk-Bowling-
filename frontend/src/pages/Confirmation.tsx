import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import "./Confirmation.css";

const Confirmation: React.FC = () => {
  const booking = useStore((s) => s.bookingResponse);
  const navigate = useNavigate();

  if (!booking) {
    return (
      <div className="confirmation-page">
        <p>No booking found</p>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="field-group">
          <label htmlFor="when">When</label>
          <div id="when" className="readonly-field">
            {new Date(booking.when).toLocaleString()}
          </div>
        </div>

        <div className="field-group">
          <label htmlFor="who">Who</label>
          <div id="who" className="readonly-field">
            {booking.people} pers
          </div>
        </div>

        <div className="field-group">
          <label htmlFor="lanes">Lanes</label>
          <div id="lanes" className="readonly-field">
            {booking.lanes} lane
          </div>
        </div>

        <div className="field-group">
          <label htmlFor="booking-number">Booking number</label>
          <div id="booking-number" className="readonly-field">
            {booking.id}
          </div>
        </div>

        <div className="total-row">
          <div className="total-label">total</div>
          <div className="total-value">{booking.price} sek</div>
        </div>

        <button className="primary" onClick={() => navigate("/")}>
          SWEET, LETS GO!
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
