import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import "../../app.css";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const images = [
  `${baseURL}/privatePhotos/wildloon.jpg`,
  `${baseURL}/privatePhotos/landfog.jpg`,
  `${baseURL}/privatePhotos/flower.jpg`,
  `${baseURL}/privatePhotos/landva.jpg`,
  `${baseURL}/privatePhotos/wildlizard.jpg`,
  `${baseURL}/privatePhotos/wildloonbw.jpg`,
];

function HomeCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Carousel
      fade
      pause={false}
      interval={3000}
      indicators={false}
      controls={false}
    >
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src={images[index]}
          alt="First slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;