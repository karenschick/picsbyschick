import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LandscapeCarousel from "../../components/LandscapeCarousel/LandscapeCarousel";
import FlowerCarousel from "../../components/FlowerCarousel/FlowerCarousel";
import WildlifeCarousel from "../../components/WildlifeCarousel/WildlifeCarousel";
import { useTheme } from "../../providers/ThemeProvider";

const ORIENTATIONS = ["landscape", "portrait", "square"];

const AllCarousels = ({ fromHome = false }) => {
  const navigate = useNavigate();
  const [orientationIndex, setOrientationIndex] = useState(0);
  const currentOrientation = ORIENTATIONS[orientationIndex];

  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const interval = setInterval(() => {
      setOrientationIndex((prevIndex) => (prevIndex + 1) % ORIENTATIONS.length);
    }, 4000); // every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const contentVariants = {
    hidden: { x: "-100vw" },
    visible: { x: 0, transition: { type: "spring", stiffness: 50 } },
  };

  const imageVariants = {
    hidden: { x: "100vw" },
    visible: { x: 0, transition: { type: "spring", stiffness: 50 } },
  };

  return (
    <div className="about-page">
      <motion.div
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Container fluid>
          <Row className="g-4 justify-content-center">
            <Col md={4}>
              <motion.div
                onClick={() => navigate("/FlowerPage")}
                style={{ cursor: "pointer" }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 50 }}
              >
                <div
                  className="carousel-wrapper"
                  style={{
                    position: "relative",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  <motion.div
                    className="home-content"
                    variants={contentVariants}
                  >
                    <FlowerCarousel
                      className="all-carousel"
                      customHeight={fromHome ? "400px" : "250px"}
                      style={{
                        overflow: "hidden",
                      }}
                      mode="preview"
                      preferredOrientation={currentOrientation}
                    />
                  </motion.div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-15%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 2,
                    }}
                  >
                    <span className={`carousel-hover-title ${theme}`}>
                      Flowers
                    </span>
                  </div>
                </div>
              </motion.div>
            </Col>

            <Col md={4}>
              <motion.div
                onClick={() => navigate("/LandscapePage")}
                style={{ cursor: "pointer" }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 50 }}
              >
                <div
                  className="carousel-wrapper"
                  style={{
                    position: "relative",
                    textAlign: "center",
                    color: "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  <motion.div className="home-img" variants={imageVariants}>
                    <LandscapeCarousel
                      className="all-carousel"
                      customHeight={fromHome ? "400px" : "250px"}
                      style={{
                        overflow: "hidden",
                      }}
                      mode="preview"
                      preferredOrientation={currentOrientation}
                    />
                  </motion.div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-15%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 2,
                    }}
                  >
                    <span className={`carousel-hover-title ${theme}`}>
                      Landscape
                    </span>
                  </div>
                </div>
              </motion.div>
            </Col>

            <Col md={4}>
              <motion.div
                onClick={() => navigate("/WildlifePage")}
                style={{ cursor: "pointer" }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 50 }}
              >
                <div
                  className="carousel-wrapper"
                  style={{
                    position: "relative",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  <motion.div className="home-img" variants={imageVariants}>
                    <WildlifeCarousel
                      className="all-carousel"
                      customHeight={fromHome ? "400px" : "250px"}
                      style={{
                        overflow: "hidden",
                      }}
                      mode="preview"
                      preferredOrientation={currentOrientation}
                    />
                  </motion.div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-15%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 2,
                    }}
                  >
                    <span className={`carousel-hover-title ${theme}`}>
                      Wildlife
                    </span>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.div>
    </div>
  );
};

export default AllCarousels;
