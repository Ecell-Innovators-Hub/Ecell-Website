import React from "react";
import ShiftingCountdown from "./../components/Countdown.jsx";
import "./Home.css";
import logo from "../assets/images/instagram.png";
import ThreeDModel from "./Object.jsx";

function Home() {
  return (
    <div>
      <ThreeDModel />
      <h2 className="Heading">Event Reminder</h2>
      <div className="event-container">
        <div className="event-left">
          <img src={logo} alt="Event" className="event-image" />
          <h2 className="event-name">Event Name</h2>
          <button className="register-button">Register</button>
          <p className="upcoming-events">Upcoming Events</p>
        </div>

        <div className="event-right">
          <ShiftingCountdown />
          <p className="add-to-calendar">
            Add to calendar{" "}
            <span role="img" aria-label="bell">
              🔔
            </span>
          </p>
          <p className="Date">Event Date : 01/12/2024</p>
          <p className="Date">Registration Last Date : 21/11/2024</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
