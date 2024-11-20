import React, { useState } from "react";
import "./Carousel.css";

const Carousel = () => {
  const images = [
    "/0R9A0299.JPG",
    "/0R9A0310.JPG",
    "/0R9A0320.JPG",
    "/0R9A0299.JPG",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div
      className="carousel"
      style={{ "--current-index": currentIndex }}
    >
      <button className="carousel-button left" onClick={prevSlide}>
        &lt;
      </button>
      <div className="carousel-track">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Event ${index + 1}`}
            className={`carousel-slide ${
              index === currentIndex ? "active" : ""
            }`}
          />
        ))}
      </div>
      <button className="carousel-button right" onClick={nextSlide}>
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
