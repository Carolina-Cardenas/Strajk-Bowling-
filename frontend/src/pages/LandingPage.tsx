import React from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";

const Home: React.FC = () => {
  return (
    <div className="page home-page">
      <header className="logo-header">
        <div className="home-logo-container">
          <img
            src="logo(1).svg"
            alt="Logo de STRAJK Bowling"
            className="home-brand-logo"
          />
        </div>
        <h1 className="logo-text">STRAJK</h1>
        <p className="small-muted"> bowling</p>
      </header>
      <main className="home-main-content">
        <Link to="/booking" className="confirmation-cta home-cta-link">
          START BOOKING
        </Link>
      </main>
    </div>
  );
};

export default Home;
