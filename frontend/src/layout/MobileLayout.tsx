import React from "react";
import NavMenu from "../components/NavMenu";
import "../styles/Layout.css";

interface Props {
  children: React.ReactNode;
}

const MobileLayout = ({ children }: Props) => {
  return (
    <div className="mobile-wrapper">
      <div className="mobile-screen">
        <NavMenu />
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
