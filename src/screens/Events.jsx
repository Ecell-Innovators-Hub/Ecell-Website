import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom"; 
import defaultEventLogo from "../assets/images/Spark_Tank.jpeg"
import "./Events.css";


function Events() {
  const [eventsList, setEventsList] = useState([]);
  useEffect(() => {
  const fetchEventsList = async () => {
    try {
      const snapshot = await getDocs(collection(db, "events"));
      const eventsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEventsList(eventsData);
    } catch (error) {
      console.error("Error fetching events data:", error);
    }
  };
  fetchEventsList();
},[]);
  return (

    // <div>
    //   <Event/>
    // </div>
    <div className="event-list-container">
    {eventsList.map((eventItem) => (
      <Link
        key={eventItem.id}
        to={`/event/${eventItem.id}`} // Navigate to the event details page with event ID
        className="event-card-link"
      >
        <div className="event-card-box">
          <img
            src={eventItem.mainImage ? eventItem.mainImage.url : defaultEventLogo}
            alt="Event Logo"
            className="event-image"
          />
          <div className="event-details">
            <h3 className="event-title">{eventItem.eventName || "Event Name"}</h3>
            <p className="event-organizer">
              Organized by: {eventItem.department || "Organizer Name"}
            </p>
            <p className="event-venue">
              Venue: {eventItem.location || "Venue Location"}
            </p>
            <button className="register-button">Register</button>
          </div>
        </div>
      </Link>
    ))}
  </div>
);
}

export default Events;
