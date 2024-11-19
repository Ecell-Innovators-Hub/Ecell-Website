import React from "react";
import "./Home.css";
import ThreeDModel from "./Object.jsx";
import EventRemainder from "../components/EventRemainder.jsx";

function Home() {
  return (
    <div>
      <ThreeDModel />
      <h2 className="Heading">Event Reminder</h2>
      <EventRemainder/>
    </div>
  );
}

export default Home;
