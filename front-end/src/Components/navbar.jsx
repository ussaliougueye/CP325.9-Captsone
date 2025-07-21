import React, { useState } from "react";
import "../stylesCSS/navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const userLogged = JSON.parse(localStorage.getItem("user"));

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <nav>
       
        <label className="logo">
          
          {userLogged.firstName} {userLogged.lastName}
        </label>

        
        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          
        </button>

        {/* Navigation links */}
        <ul className={`nav-menu ${isMenuOpen ? "nav-open" : ""}`}>
          
          <li>
            <a href="#" onClick={closeMenu}>
              Chat
            </a>
          </li>
          <li>
            <a href="#" onClick={closeMenu}>
              Direct Messages
            </a>
          </li>
          <li>
            <a href="#" onClick={closeMenu}>
              Contact
            </a>
          </li>
          <li>
            <a href="#" onClick={closeMenu}>
              Feedback
            </a>
          </li>
          <li style={{"color": "red"}}>
            <a href="http://localhost:5173/" onClick={closeMenu}>
              LogOut
            </a>
          </li>
        </ul>
        {/* Backdrop for mobile dropdown */}
        {isMenuOpen && <div className="nav-backdrop" onClick={closeMenu}></div>}
      </nav>
    </div>
  );
}

export default Navbar;
