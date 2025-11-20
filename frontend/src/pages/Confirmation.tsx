import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import "../styles/Confirmation.css";

const Confirmation: React.FC = () => {
  const booking = useStore((s) => s.bookingResponse);
  const navigate = useNavigate();

  if (!booking) {
    return (
      <div className="confirmation-page">
        <div className="confirmation-card">
          <p>No booking found</p>
          <button className="confirmation-cta" onClick={() => navigate("/")}>
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <h1 className="confirmation-title">SEE YOU SOON!</h1>

      <div className="confirmation-card">
        <div className="field-group">
          <label>When</label>
          <div className="readonly-field">
            {new Date(booking.when).toLocaleString()}
          </div>
        </div>

        <div className="field-group">
          <label>Who</label>
          <div className="readonly-field">{booking.people} pers</div>
        </div>

        <div className="field-group">
          <label>Lanes</label>
          <div className="readonly-field">{booking.lanes} lane</div>
        </div>

        <div className="field-group">
          <label>Booking number</label>
          <div className="readonly-field">{booking.id}</div>
        </div>

        <div className="total-box">
          <div className="total-label">total</div>
          <div className="total-value">{booking.price} sek</div>
        </div>

        <button className="confirmation-cta" onClick={() => navigate("/")}>
          SWEET, LETS GO!
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
