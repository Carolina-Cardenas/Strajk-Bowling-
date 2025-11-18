import React from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./pages/Loading";
import Booking from "./pages/Booking";
import Confirmation from "./pages/Confirmation";
import NavMenu from "./components/NavMenu";

const App: React.FC = () => {
  return (
    <div className="app-root">
      <NavMenu />
      <Routes>
        <Route path="/" element={<Booking />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </div>
  );
};

export default App;
