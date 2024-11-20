import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import logo from './../assets/images/white_logo.png';

function Navigator() {
  // State to handle the menu toggle for mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle menu visibility
  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="logo">
        <img className="logo-image" src={logo} alt=""/>
        <h1>E-CELL</h1>
      </div>
      {/* Toggle button for mobile menu */}
      <div className="menu-toggle" onClick={handleToggle}>
        ☰
      </div>
      {/* Conditionally apply 'active' class based on isMenuOpen state */}
      <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Events
        </NavLink>
        {/*<NavLink
          to="/case-study"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Case Study
        </NavLink>*/}
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          About
        </NavLink>
        <NavLink
          to="/contac"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Contact Us
        </NavLink>
        <NavLink
          to="/team"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Team
        </NavLink>
        {/* <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Login
        </NavLink> */}
      
      </nav>
    </header>
  );
}

export default Navigator;
