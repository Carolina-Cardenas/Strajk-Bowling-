import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Booking from "./pages/Booking";
import Confirmation from "./pages/Confirmation";
import NavMenu from "./components/NavMenu";
import BookingConfirmation from "./pages/BookingConfirmation";

const App: React.FC = () => {
  return (
    <div className="app-root">
      <div className="app-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="bookingConfirmation" element={<BookingConfirmation />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
