import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import "../styles/Confirmation.css";

const Confirmation: React.FC = () => {
  const navigate = useNavigate();
  const bookingResponse = useStore((s) => s.bookingResponse);

  console.log("Confirmation: valor leído de bookingResponse:", bookingResponse);

  if (!bookingResponse || !bookingResponse.bookingDetails) {
    return (
      <div className="confirmation-page">
        <div className="confirmation-card">
          <p>No booking found</p>
          <button className="btn-cta" onClick={() => navigate("/")}>
            Return to Booking
          </button>
        </div>
      </div>
    );
  }
  const booking = bookingResponse.bookingDetails;
  const formattedDate = new Date(booking.when).toLocaleString("es-ES", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="confirmation-page">
      <h1 className="confirmation-title">SEE YOU SOON!</h1>

      <div className="confirmation-card">
        <div className="field-group">
          <label>When</label>
          <div className="readonly-field">{formattedDate}</div>
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
