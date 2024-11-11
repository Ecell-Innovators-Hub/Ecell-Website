import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Event.css";
import ShiftingCountdown from "../components/Countdown.jsx";
import logo from "../assets/images/Spark_Tank.jpeg";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../components/Loader";

function Event() {
  const navigate = useNavigate();
  const location = useLocation();
  const eventId = location.state?.eventId; // Ensure it's coming from the location state
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const getEvent = async () => {
      if (!eventId) {
        console.error("No event ID provided");
        return;
      }
      try {
        const eventDoc = await getDoc(doc(db, "events", eventId));
        if (eventDoc.exists()) {
          setEvent({ id: eventDoc.id, ...eventDoc.data() });
        } else {
          console.error("Event not found");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    if (eventId) {
      getEvent();
    } else {
      console.error("Event ID is missing.");
    }
  }, [eventId]); // Add eventId as dependency to refetch data when eventId changes

  const handleSubmit = () => {
    if (event?.id) {
      navigate("/reg", { state: { eventId: event.id } });
    } else {
      console.error("Event ID is not available.");
    }
  };

  // Check if registration date has passed
  const hasRegistrationClosed = event?.regDate
    ? new Date() > new Date(event.regDate)
    : false;

  if (!event) {
    return <Loader />;
  }

  return (
    <div className="eventid-container">
      <div className="eventid-left">
        <img
          src={event.mainImage ? event.mainImage.url : logo}
          alt="Event"
          className="eventid-image"
        />
        <h2 className="eventid-name">{event.eventName || "Event Name"}</h2>
        <p className="eventid-location">
          <p className="eventid-department" style={{ margin: "10px" }}>
            Department: {event.department}
          </p>
          <span role="img" aria-label="location">
            📍
          </span>
          {event.location ? event.location.replace(/,/g, ",<br />") : ""}
        </p>

        {hasRegistrationClosed ? (
          <p style={{ color: "red", fontWeight: "bold", fontSize: "21px" }} className="upcomingid-events">
            Registrations Closed!
          </p>
        ) : (
          <button className="registerid-button" onClick={handleSubmit}>
            Register
          </button>
        )}

        <p className="upcomingid-events" style={{ fontSize: 16, fontWeight: "bold" }}>
          Registration Last Date :{" "}
          {event.regDate
            ? event.regDate.split("-").reverse().join("/")
            : "Registration date not available"}
        </p>

        <div className="prizesid">
          <h4>Prizes</h4>
          <span role="img" aria-label="first place medal">
            🥇
          </span>
          1st Prize - {event.firstPrize || "₹ *****"} <br />
          <span role="img" aria-label="second place medal">
            🥈
          </span>
          2nd Prize - {event.secondPrize || "₹ *****"} <br />
          <span role="img" aria-label="third place medal">
            🥉
          </span>
          3rd Prize - {event.thirdPrize || "₹ *****"} <br />
        </div>
      </div>

      <div className="eventid-right">
        <ShiftingCountdown date={event.date || ""} time={event.time || ""} />
        <p className="add-to-calendar">
          Add to calendar{" "}
          <span role="img" aria-label="bell">
            🔔
          </span>
        </p>

        <div className="eventid-description">
          <h4 style={{ display: "inline", marginRight: "8px" }}>
            Description:
          </h4>
          <p style={{ display: "inline" }}>
            {event.description || "Event Description"}
          </p>
        </div>

        <div className="eventid-organizers">
          {event.coordinators && event.coordinators.length > 0 ? (
            event.coordinators.map((coordinator, index) => (
              <div className="members" key={index}>
                <h5 className="role">{coordinator.role}</h5>
                <div
                  className={`organizer-info organizer-card Img${index + 1}`}
                  style={{
                    background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), black 80%), url(${coordinator.image.url})`,
                    backgroundSize: "cover",
                    width: "200px",
                    height: "280px",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <p>{coordinator.name}</p>
                  <p>{coordinator.phone}</p>
                  <p>{coordinator.email}</p>
                  <p>{coordinator.department}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No Details</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Event;
