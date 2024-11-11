import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import defaultEventLogo from "../assets/images/Spark_Tank.jpeg";
import "./Events.css";

function Events() {
  const [eventsList, setEventsList] = useState([]);
  const navigate = useNavigate();

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
  }, []);

  const handleSubmit = (eventId) => {
    navigate("/event", { state: { eventId } });
  };

  return (
    <div>
      <h1 className="events-heading">Events</h1>
      <div className="event-list-container">
        {eventsList.map((eventItem) => (
          <div key={eventItem.id} className="event-card-box event-card-link">
            <img
              src={
                eventItem.mainImage ? eventItem.mainImage.url : defaultEventLogo
              }
              alt="Event Logo"
              className="event-image"
            />
            <div className="event-details">
              <h3 className="event-title">
                {eventItem.eventName || "Event Name"}
              </h3>
              <p className="event-organizer">
                Organized by: {eventItem.department || "Organizer Name"}
              </p>
              <p className="event-venue">
                Venue: {eventItem.location || "Venue Location"}
              </p>
            </div>
            <button
              className="register-button"
              onClick={() => handleSubmit(eventItem.id)}
            >
              Register
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
