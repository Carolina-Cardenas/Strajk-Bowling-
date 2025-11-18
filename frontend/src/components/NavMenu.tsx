import React from "react";
//import styles from "./NavMenu.module.css";
import { Link } from "react-router-dom";
import { useStore } from "../store/useStore";

const NavMenu: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        className={styles.icon}
        onClick={() => setOpen(!open)}
        aria-label="menu"
      >
        ≡
      </button>
      {open && (
        <aside className={styles.drawer}>
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
