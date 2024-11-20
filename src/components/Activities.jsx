import React, { useEffect, useRef } from "react";
import "./Activities.css";

const Activities = () => {
  const typewriterElement = useRef(null); // Ref for the element where text will be typed
  const observerRef = useRef(null); // Ref for observing the card
  const index = useRef(0); // Ref for typing index
  const hasStartedTyping = useRef(false); // Tracks if typing has started

  useEffect(() => {
    const text =
      "E-Cell is the heart of innovation and entrepreneurship in our college, fostering a vibrant ecosystem where ideas thrive and transform into impactful solutions. Our mission is to empower students with the knowledge, resources, and opportunities to explore their entrepreneurial potential. Through workshops, mentorship programs, pitch competitions, and networking events, we aim to bridge the gap between ideas and execution. Whether you're an aspiring entrepreneur or simply eager to learn, E-Cell provides a platform to collaborate, innovate, and grow. Join us to be part of a community that’s shaping the future, one idea at a time.";

    const typingSpeed = 30; // Typing speed in ms

    const typeWriterEffect = () => {
      if (index.current < text.length) {
        typewriterElement.current.innerHTML += text.charAt(index.current);
        index.current++;
        setTimeout(typeWriterEffect, typingSpeed);
      }
    };

    const observerCallback = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasStartedTyping.current) {
        hasStartedTyping.current = true; // Start typing only once
        typeWriterEffect();
      }
    };

    const observerOptions = {
      root: null, // Observe within the viewport
      threshold: 0.5, // Trigger when 50% of the card is visible
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const observedElement = observerRef.current; // Copy the ref value to a variable
    if (observedElement) {
      observer.observe(observedElement); // Observe the card
    }

    return () => {
      if (observedElement) {
        observer.unobserve(observedElement); // Clean up observer on unmount
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="activities-container">
      <div className="card" ref={observerRef}>
        <p className="heading">About E-Cell</p>
        <div id="typewriter" ref={typewriterElement}></div>
      </div>
    </div>
  );
};

export default Activities;
