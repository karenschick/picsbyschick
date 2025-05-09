import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Modal, Carousel } from "react-bootstrap";
import { Image as RBImage } from "react-bootstrap";
import { motion } from "framer-motion";
import { useTheme } from "../../providers/ThemeProvider";
import getOrientation from "../../utils/getOrientation";
import landscape from "../../portfolios/landscape";
import "../../app.css";

const LandscapePortfolio = ({ setModalOpen }) => {
  const [showModal, setShowModal] = useState(false); // Modal open/close state
  const [activeIndex, setActiveIndex] = useState(0); // Active image index for modal carousel

  const [showModalLocal, setShowModalLocal] = useState(false);

  useEffect(() => {
    setModalOpen(showModalLocal);
  }, [showModalLocal, setModalOpen]);

  // Access current theme
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Handle clicking on portfolio card
  const handleCardClick = (index) => {
    setActiveIndex(index);
    setShowModal(true);
    setShowModalLocal(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setShowModalLocal(false);
  };

  // Initial portfolio data (image, title and location)
  const [portfolios, setPortfolios] = useState([]);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 30,
        damping: 15,
      },
    },
  };

  // useEffect runs once when the compent mounts due to empty dependency array
  useEffect(() => {
    // Define an async function inside useEffect
    const loadPortfoliosWithOrientation = async () => {
      // Wait for all portfolio items to be processed
      const updatedPortfolios = await Promise.all(
        landscape.map(async (item) => ({
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
                    }}
                  >
                    <div
                      style={{
                        width: "100%", // Full width
                        height: "100%", // Full height
                        position: "relative", // Positioning for child element
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

      {showModal && (
        <div
          style={{
            position: "fixed", // Fixes the overlay to viewport
            top: 0,
            left: 0,
            width: "100vw", // Full viewport width
            height: "100vh", // Full viewport height
            zIndex: 1030, // High z-index to ensure it appears above other content
            overflow: "hidden", // Prevent scrolling while modal is open
            backgroundColor: isDark ? "#000" : "#fff", // Background color changes based on theme
          }}
        ></div>
      )}

      {/* Modal for showing the full-sized images and carousel */}
      <Modal
        show={showModal} // Whether the modal is visible
        onHide={handleCloseModal} // Function to close the modal
        centered // Center the modal in the viewport
        size="lg" // Large size for the modal
        backdrop={false} // Enable backdrop for modal
        keyboard={true} // Close the modal with the escape key
        fullscreen // Make the modal fullscreen on mobile
        contentClassName="transparent-modal"
        backdropClassName="transparent-backdrop"
      >
        {/* Modal header displaying title and location */}
        <Modal.Header
          className={`d-flex justify-content-center align-items-center ${
            isDark ? "modal-header-dark" : "modal-header-light"
          }`} // Centers content inside header, targets closebutton stylying making visible in dark mode
          closeButton // Adds a close ('x') button to the modal
          style={{
            border: "none", // Removes the default border
            backgroundColor: isDark ? "#000" : "#fff", // Header background matches the current theme
            color: isDark ? "#fff" : "#000", // Text color contrasts background for visibility
          }}
        >
          {portfolios[activeIndex] && (
            <h5
              className="flex-grow-1 text-center" // Makes heading expand to fill header and centers text
              style={{
                margin: 0,
                width: "100%",
                textAlign: "center",
              }}
            >
              {/* Displays the active portfolio item's title and location */}
              {/* {portfolios[activeIndex].title} -{" "}
              {portfolios[activeIndex].location} */}
            </h5>
          )}
        </Modal.Header>

        {/* Modal body containing the carousel */}
        <Modal.Body className={isDark ? "modal-body-dark" : "modal-body-light"}>
          <Carousel
            indicators={false} // Disable indicators (dots) in the carousel
            activeIndex={activeIndex} // Current active index for the carousel
            onSelect={(selectedIndex) => setActiveIndex(selectedIndex)} // Handle carousel item change
          >
            {portfolios.map((item, index) => (
              <Carousel.Item key={index}>
                <div
                  style={{
                    width: "100vw", // Full width of the viewport
                    height: "85vh", // 85% of the viewport height
                    display: "flex", // Flexbox layout to center content
                    alignItems: "center", // Vertically center the content
                    justifyContent: "center", // Horizontally center the content
                    overflow: "hidden", // Hide overflow content
                    // backgroundColor: isDark ? "#000" : "#fff",
                  }}
                >
                  {/* Image inside carousel */}
                  <RBImage
                    src={item.img}
                    style={{
                      width: "auto", // Maintain image aspect ratio
                      height: "auto", // Maintain image aspect ratio
                      maxWidth: "90vw", // Limit width to 90% of the viewport width
                      maxHeight: "90vh", // Limit height to 90% of the viewport height
                      objectFit: "cover", // Ensure the image covers the area without distortion
                    }}
                    fluid
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>{" "}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LandscapePortfolio;