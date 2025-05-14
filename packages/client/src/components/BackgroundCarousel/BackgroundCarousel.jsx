import React, { useEffect, useState } from "react";


const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const images = [
  `${baseURL}/privatePhotos/wildloonbw.jpg`,
  `${baseURL}/privatePhotos/landfog.jpg`,
  `${baseURL}/privatePhotos/flower.jpg`,
  `${baseURL}/privatePhotos/flowdarkyell.jpg`,
  `${baseURL}/privatePhotos/landva.jpg`,
  `${baseURL}/privatePhotos/landstjbw.jpg`,
  `${baseURL}/privatePhotos/landwinskate.jpg`,
];

const BackgroundCarousel = ({ zIndex = -1 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${images[index]})`,
        transition: "background-image 1s ease-in-out",
        opacity: 0.1,
        zIndex: zIndex,
        pointerEvents: "none",
      }}
    ></div>
  );
};

export default BackgroundCarousel;