  import React, { useEffect, useState } from "react";
  import { db } from "../firebase";
  import { collection, getDocs } from "firebase/firestore";
  import { useNavigate } from "react-router-dom";
  import defaultEventLogo from "../assets/images/Spark_Tank.jpeg";
  import "./Events.css";

  function Events({ isLoggedIn }) {
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [completedEvents, setCompletedEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      console.log(isLoggedIn);
      const fetchEventsList = async () => {
        try {
          const snapshot = await getDocs(collection(db, "events"));
          const eventsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          const now = new Date();
          const upcoming = [];
          const completed = [];

          eventsData.forEach((event) => {
            const eventDate = new Date(`${event.date}T${event.time}`);
            if (eventDate > now) {
              upcoming.push(event);
            } else {
              completed.push(event);
            }
          });

          setUpcomingEvents(upcoming);
          setCompletedEvents(completed);
        } catch (error) {
          console.error("Error fetching events data:", error);
        }
      };
      fetchEventsList();
    }, [isLoggedIn]);

    const handleViewMore = (eventId) => {
      navigate("/event", { state: { eventId } });
      console.log(eventId);
    };

    const handleAddEvent = () => {
      navigate("/newevent");
    };

    return (
      <div>
        <div className="events-header">
          <h1 className="events-heading">Events</h1>
          {isLoggedIn && (
            <button
              className="add-event"
              style={{ width: "10%", fontSize: 16 }}
              onClick={handleAddEvent}
            >
              + Add Event
            </button>
          )}
        </div>

        <div className="event-category">
          <h2 style={{padding:20}} className="events-heading">Upcoming Events</h2>
          <div className="event-list-container">
            {upcomingEvents.map((eventItem) => (
              <div key={eventItem.id} className="event-card-box">
                <img
                  src={
                    eventItem.mainImage
                      ? eventItem.mainImage.url
                      : defaultEventLogo
                  }
                  alt="Event Logo"
                  className="event-image"
                />
                <div className="event-details">
                  <h3 className="event-title">
                    {eventItem.eventName || "Event Name"}
                  </h3>
                  <p className="event-organizer">
                    <b>Organized by:</b>{" "}
                    {eventItem.department || "Organizer Name"}
                  </p>
                  <p className="event-venue">
                    <b>Venue:</b> {eventItem.location || "Venue Location"}
                  </p>
                  <p className="event-date" style={{marginBottom:4,margin:0}}>
                    <b>Date : </b> {eventItem.date}
                  </p>
                  <p className="event-time" style={{marginBottom:4,margin:0}}>
                    <b>Time : </b> {eventItem.time}
                  </p>
                  <button
                    className="register-button"
                    onClick={() => handleViewMore(eventItem.id)}
                  >
                    View More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="event-category">
          <h2 style={{padding:20}} className="events-heading">Completed Events</h2>
          <div className="event-list-container">
            {completedEvents.map((eventItem) => (
              <div key={eventItem.id} className="event-card-box">
                <img
                  src={
                    eventItem.mainImage
                      ? eventItem.mainImage.url
                      : defaultEventLogo
                  }
                  alt="Event Logo"
                  className="event-image"
                />
                <div className="event-details" style={{marginBottom:23}}>
                  <h3 className="event-title">
                    {eventItem.eventName || "Event Name"}
                  </h3>
                  <p className="event-organizer">
                    <b>Organized by:</b>{" "}
                    {eventItem.department || "Organizer Name"}
                  </p>
                  <p className="event-venue">
                    <b>Venue:</b> {eventItem.location || "Venue Location"}
                  </p>
                  <p className="event-date" style={{marginBottom:4,margin:0}}>
                    <b>Date : </b> {eventItem.date}
                  </p>
                  <p className="event-time" style={{marginBottom:4,margin:0}}>
                    <b>Time : </b> {eventItem.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  export default Events;
