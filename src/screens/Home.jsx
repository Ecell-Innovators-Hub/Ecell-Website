import React from "react";
import "./Home.css";
import ThreeDModel from "./Object.jsx";
import EventRemainder from "../components/EventRemainder.jsx";
import Activities from "../components/Activities.jsx";
import FAQ from "../components/FAQ.jsx";
 import Carousel from "../components/Carousel.jsx"; 

function Home() {
  return (
    <div>
      <ThreeDModel />
      <h2 className="Heading">Next Big Event</h2>
      <EventRemainder/>
      <div>
      <h2>Event highlights</h2>
      <Carousel />
      </div>
      <Activities />
      <FAQ />
    </div>
  );
}

export default Home;
