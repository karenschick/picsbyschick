import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Modal, Carousel } from "react-bootstrap";
import { Image as RBImage } from "react-bootstrap";
import { motion } from "framer-motion";
import { useTheme } from "../../providers/ThemeProvider";
import getOrientation from "../../utils/getOrientation";
import BackgroundCarousel from "../BackgroundCarousel/BackgroundCarousel";
import flower from "../../portfolios/flower";
import "../../app.css";

const FlowerPortfolio = () => {
  const [showModal, setShowModal] = useState(false); // Modal open/close state
  const [activeIndex, setActiveIndex] = useState(0); // Active image index for modal carousel

  const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
  
  const theme = useTheme();
  const isDark = theme === "dark";

  // Handle clicking on portfolio card
  const handleCardClick = (index) => {
    setActiveIndex(index);
    setShowModal(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => setShowModal(false);

  // Initial portfolio data (image, title and location)
  const [portfolios, setPortfolios] = useState([]);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  // useEffect runs once when the compent mounts due to empty dependency array
  useEffect(() => {
    // Define an async function inside useEffect
    const loadPortfoliosWithOrientation = async () => {
      // Wait for all portfolio items to be processed
      const updatedPortfolios = await Promise.all(
        flower.map(async (item) => ({
          ...item, // Copy existing properties
          orientation: await getOrientation(item.img), // Add orientation
        }))
      );

      // Update the state with the new portfolio data
      setPortfolios(updatedPortfolios);
    };

    // Call the async function
    loadPortfoliosWithOrientation();
  }, []); // Still runs only once on mount

  return (
    <>
      {/* Main container for the grid of portfolios */}
      <Container className=" mt-5">
        {/* Row to contain portfolio items with custom styles for wrapping and spacing */}
        <Row
          className="mb-5"
          style={{
            display: "flex", // Use flexbox for layout
            flexWrap: "wrap", // Allow items to wrap to new lines if needed
            justifyContent: "space-between", // Distribute items evenly across row
            columnGap: "0.25rem", // Small column gap
            rowGap: "2rem", // Larger row gap
          }}
        >
          {/* Render each portfolio item */}
          {portfolios
            .filter((p) => p.orientation) // Filter portfolios only allow those with orientation propety
            .map((portfolio, index) => {
              return (
                <motion.div
                  key={portfolio.id} // Unique key for each portfolio item
                  variants={cardVariants} // Animation variants for card
                  initial="hidden" // State's initial animation
                  whileInView="visible"
                  viewport={{ once: false }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }} // Hover effect, scales item up
                  whileTap={{ scale: 0.9 }} //Tap effect, scales item down
                  onClick={() => handleCardClick(index)} // Click even to open modal with clicked item
                  style={{
                    flex:
                      portfolio.orientation === "portrait"
                        ? "0 1 15%" // Adjust size for portrait
                        : portfolio.orientation === "square"
                        ? "0 1 22%" // Adjust size for square
                        : "0 1 30%", //Default size
                    maxWidth: "100%", // Allow to scale within container
                    cursor: "pointer", // Pointer cursor on hover
                    display: "flex", // Flex display for centering content
                    justifyContent: "center", // Center content horizonally
                    minWidth: "160px", // Minimum item width
                    border: "none",
                  }}
                >
                  {/* Portfolio card component */}
                  <Card
                    className="border-0" // No card border
                    style={{
                      height: "250px", // Fixed card height
                      width: "100%", // Full width of container
                      overflow: "hidden", // Hide overflow content
                      background: "#000", //Black background for card
                      border: "none",
                      boxShadow: "none",
                    }}
                  >
                    <div
                      style={{
                        width: "100%", // Full width
                        height: "100%", // Full height
                        position: "relative", // Positioning for child element
                        border: "none",
                      }}
                    >
                      {/* Responsive Bootstrap Image */}
                      <RBImage
                        srcSet={`
                                      ${portfolio.img}?w=400 400w,
                                      ${portfolio.img}?w=800 800w,
                                      ${portfolio.img}?w=1200 1200w
                                    `}
                        sizes="(max-width: 600px) 400px, (max-width: 1024px) 800px, 1200px"
                        src={portfolio.img}
                        style={{
                          width: "100%", // Full width of the container
                          height: "100%", // Full height of the container
                          objectFit: "cover", // Ensure the image covers the area without stretching
                          objectPosition: "center", // Center the image
                          border: "none",
                        }}
                        fluid
                      />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
        </Row>
      </Container>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        size="lg"
        backdrop="true"
        keyboard={true}
      >
        {/* <Modal.Header closeButton /> */}
        <Modal.Body>
          <Carousel
            indicators={false}
            activeIndex={activeIndex}
            onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}
          >
            {portfolios.map((item, index) => (
              <Carousel.Item key={index}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh",
                  }}
                >
                  <RBImage
                    src={item.img}
                    style={{
                      width: item.orientation === "portrait" ? "auto" : "100%",
                      height: item.orientation === "portrait" ? "100%" : "auto",
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                    fluid
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FlowerPortfolio;