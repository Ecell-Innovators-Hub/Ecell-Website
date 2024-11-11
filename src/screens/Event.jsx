import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import "./Event.css";
import ShiftingCountdown from "../components/Countdown.jsx";
import logo from "../assets/images/Spark_Tank.jpeg";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function Event() {
  const { eventId } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const getEvent = async () => {
      try {
        console.log("Fetching event with ID:", eventId); // Debugging statement
        const eventDoc = await getDoc(doc(db, "events", eventId));
        if (eventDoc.exists()) {
          console.log("Event data:", eventDoc.data()); // Debugging statement
          setEvent({ id: eventDoc.id, ...eventDoc.data() });
        } else {
          console.error("Event not found");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    getEvent();
  }, [eventId]);

  if (!event) {
    return <p>Loading event...</p>;
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
          <p className="eventid-department" style={{margin:'10px'}}>Department: {event.department}</p>
            <span role="img" aria-label="location">
              📍
            </span>
            {event.location || "LH-2, C BLOCK,"}
           
            <br /> Vishnu Institute of Technology,
            <br /> Bhimavaram, Andhra Pradesh 523155
          </p>
          <button className="registerid-button">Register</button>
          <p className="upcomingid-events">Upcoming Events</p>
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
              Spark Tank is an engaging event designed to foster innovation,
              creativity, and problem-solving. Modeled after entrepreneurial
              competitions, it provides a platform for participants to pitch their
              original ideas, products, or projects to a panel of judges,
              typically comprised of industry experts, investors, or business
              leaders. Competitors often represent startups, community
              organizations, or even student groups, showcasing solutions that
              address real-world challenges.
              {event.description || "Event Description"}
            </p>
          </div>

          <div className="eventid-organizers">
            {event.coordinators && event.coordinators.length > 0 ? (
              event.coordinators.map((coordinator,index)=>(
                <div className="members" key={index}>
                    <h5 className="role">{coordinator.role}</h5>
                    <div className={`organizer-info organizer-card Img${index + 1}`}
                     style={{
                      background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), black 80%), url(${coordinator.image.url})`,
                      backgroundSize: 'cover',
                      width:'200px',
                      height:'280px',
                      backgroundPosition: 'center',
                       backgroundRepeat: 'no-repeat',
                    }}
                    >
                          <p>{coordinator.name}</p>
                          <p>{coordinator.phone}</p>
                          <p>{coordinator.email}</p>
                          <p>{coordinator.department}</p>
                        </div>
                </div>
              ))
            ):(<p>No Details</p>)}

          </div>
        </div>
      </div>
  );
}

export default Event;
