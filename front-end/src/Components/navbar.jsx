import React, { useState } from "react";
import "../stylesCSS/navbar.css";

function Navbar() {
  return (
    <>
      <nav>
        {/* Checkbox for toggling menu */}
        <input type="checkbox" id="check" />

        {/* Menu icon */}
        <label htmlFor="check" className="checkbtn">
          <i className="fas fa-bars"></i>
        </label>

        {/* Site logo */}
        <label className="logo">Profil name and image</label>

        {/* Navigation links */}
        <ul>
          <li>
            <a className="active" href="#">
            Saliou
            </a>
          </li>
          <li>
            <a href="#">Chat</a>
          </li>
          <li>
            <a href="#">Direct Messages</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">Feedback</a>
          </li>
        </ul>
      </nav>

      
    </>
  );
}

export default Navbar;
