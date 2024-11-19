import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import ShiftingCountdown from "../components/Countdown.jsx";
import logo from "../assets/images/Spark_Tank.jpeg";
import "./EventRemainder.css";
import { useNavigate } from "react-router-dom";

function EventRemainder() {
  const navigate = useNavigate();
  const [nextEvent, setNextEvent] = useState(null);

  useEffect(() => {
    const fetchNextEvent = async () => {
      try {
        const now = new Date();
        const eventsRef = collection(db, "events");

        // Query to get upcoming events, ordered by date and time, limited to the next upcoming event
        const upcomingEventsQuery = query(
          eventsRef,
          where("date", ">=", now.toISOString().split("T")[0]), // Filter for future dates
          orderBy("date"),
          orderBy("time"),
          limit(1)
        );

        const querySnapshot = await getDocs(upcomingEventsQuery);
        if (!querySnapshot.empty) {
          const eventData = querySnapshot.docs[0].data();
          setNextEvent({ id: querySnapshot.docs[0].id, ...eventData });
        } else {
          console.log("No upcoming events found.");
        }
      } catch (error) {
        console.error("Error fetching next event:", error);
      }
    };

    fetchNextEvent();
  }, []);

  const handleSubmit = () => {
    if (nextEvent?.id) {
      navigate("/reg", { state: { eventId: nextEvent.id } });
      console.log(nextEvent.id);
    } else {
      console.error("Event ID is not available.");
    }
  };

  if (!nextEvent) {
    return <p>Loading next event...</p>;
  }

  const { eventName, date, regDate, time } = nextEvent;

  // Check if the registration date has passed
  const hasRegistrationClosed = regDate
    ? new Date() > new Date(regDate)
    : false;

  // Safely handle undefined date and regDate fields
  const formattedDate = date
    ? date.split("-").reverse().join("/")
    : "Date not available";
  const formattedRegDate = regDate
    ? regDate.split("-").reverse().join("/")
    : "Registration date not available";

  return (
    <div className="event-container">
      <div className="event-left">
        <img
          style={{ width: 200, height: 200 }}
          src={nextEvent.mainImage ? nextEvent.mainImage.url : logo}
          alt="Event"
          className="event-image"
        />
        <h2 className="event-name">{eventName || "Event Name"}</h2>
        {hasRegistrationClosed ? (
          <p
            style={{ color: "red", fontWeight: "bold", fontSize: "21px" }}
            className="upcomingid-events"
          >
            Registrations Closed!
          </p>
        ) : (
          <button className="registerid-button" onClick={handleSubmit}>
            Register
          </button>
        )}
      </div>

      <div className="event-right">
        <ShiftingCountdown date={date} time={time} />
        <p className="add-to-calendar">
          Add to calendar{" "}
          <span role="img" aria-label="bell">
            🔔
          </span>
        </p>
        <p className="Date">Event Date: {formattedDate}</p>
        <p className="Date">Registration Last Date: {formattedRegDate}</p>
      </div>
    </div>
  );
}

export default EventRemainder;
