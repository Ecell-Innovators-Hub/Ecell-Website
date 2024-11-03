import React from "react";
import "./Event.css";
import ShiftingCountdown from "../components/Countdown.jsx";
import logo from "../assets/images/Spark_Tank.jpeg";

function Event() {
  return (
    <div className="event-container">
      <div className="event-left">
        <img src={logo} alt="Event" className="event-image" />
        <h2 className="event-name">Event Name</h2>
        <p className="event-location">
          <span role="img" aria-label="location">
            📍
          </span>
          LH-2, C Block,
          <br /> Vishnu Institute of Technology,
          <br /> Bhimavaram, Andhra Pradesh 523155
        </p>
        <button className="register-button">Register</button>
        <p className="upcoming-events">Upcoming Events</p>
        <div className="prizes">
          <h4>Prizes</h4>
          <span role="img" aria-label="first place medal">
            🥇
          </span>
          1st Prize - ₹ 10,000 <br />
          <span role="img" aria-label="second place medal">
            🥈
          </span>
          2nd Prize - ₹ 5,000 <br />
          <span role="img" aria-label="third place medal">
            🥉
          </span>
          3rd Prize - ₹ 3,000 <br />
        </div>
      </div>

      <div className="event-right">
        <ShiftingCountdown />
        <p className="add-to-calendar">
          Add to calendar{" "}
          <span role="img" aria-label="bell">
            🔔
          </span>
        </p>

        <div className="event-description">
          <h4 style={{ display: "inline", marginRight: "8px" }}>
            Description:
          </h4>
          <p style={{ display: "inline" }}>
            Spark Tank is an engaging event designed to foster innovation,
            creativity, and problem-solving. Modeled after entrepreneurial
            competitions, it provides a platform for participants to pitch their
            original ideas, products, or projects to a panel of judges,
            typically comprised of industry experts, investors, or business
            leaders. Competitors often represent startups, community
            organizations, or even student groups, showcasing solutions that
            address real-world challenges.
          </p>
        </div>

        <div className="event-organizers">
          <div className="members">
            <h5 className="role">Student Coordinator</h5>
            <div className="organizer-info organizer-card Img1">
              <p>N Phanindra</p>
              <p>+91 84765987</p>
              <p>22pa1a05a1@vishnu.edu.in</p>
              <p>CSE Dept.</p>
            </div>
          </div>
          <div className="members">
            <h5 className="role">Student Organizer</h5>
            <div className="organizer-info organizer-card Img2">
              <p>A Bhuapati</p>
              <p>+91 738 613 0954</p>
              <p>22pa1a05a1@vishnu.edu.in</p>
              <p>CSE Dept.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event;
