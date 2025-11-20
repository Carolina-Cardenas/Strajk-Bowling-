import React from "react";
import "../styles/NavMenu.css";
import { Link } from "react-router-dom";

const NavMenu: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        className="menu-icon"
        onClick={() => setOpen(!open)}
        aria-label="menu"
      >
        <div className="bars">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {open && (
        <aside className="menu-drawer">
          <nav>
            <ul>
              <li>
                <Link to="/" onClick={() => setOpen(false)}>
                  Booking
                </Link>
              </li>
              <li>
                <Link to="/confirmation" onClick={() => setOpen(false)}>
                  Confirmation
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
      )}
    </>
  );
};

export default NavMenu;
