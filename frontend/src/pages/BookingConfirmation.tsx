// src/pages/Confirmation.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Confirmation.css";

const Confirmation: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="confirmation-page">
      <div className="confirmation-content">
        <h1 className="confirmation-title">BOOKING CONFIRMATION</h1>
      </div>
    </div>
  );
};

export default Confirmation;
