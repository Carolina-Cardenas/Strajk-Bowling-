import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import NavMenu from "@components/NavMenu";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate("/booking");
  };

  return (
    <div className="landing-page">
      <NavMenu />
      <div className="logo-container">
        <img
          src="/img/logo.svg"
          alt="STRAJK Bowling Logo"
          className="brand-logo"
        />
        <h1 className="logo-title">STRAJK</h1>
        <h2 className="logo-subtitle">BOWLING</h2>
      </div>
    </div>
  );
};

export default LandingPage;
