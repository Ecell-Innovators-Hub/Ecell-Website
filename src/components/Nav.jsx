import React from "react";
import { NavLink } from "react-router-dom";
// import logo from "../assets/images/white_logo.png";
import "./Nav.css";

function Navigator() {
  return (
    <header>
      <div className="logo">
        <h1>E-CELL</h1>
      </div>
      <nav className="nav">
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
        <NavLink
          to="/case-study"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Case Study
        </NavLink>
        <NavLink
          to="/schemes"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Schemes
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Login
        </NavLink>
      </nav>
    </header>
  );
}

export default Navigator;
