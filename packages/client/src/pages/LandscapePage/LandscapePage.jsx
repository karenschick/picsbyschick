import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LandscapeCarousel, LandscapePortfolio } from "../../components";
import "../../app.css";

const LandscapePage = ({ setModalOpen }) => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const contentVariants = {
    hidden: { x: "100vw" },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 50, damping: 20 },
    },
  };

  return (
    <>
      <Container className="mt-4 mb-5">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
            whileHover={{ scale: 1.03 }}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <LandscapeCarousel
              className="portrait-page-carousel"
              style={{ height: "800px", overflow: "hidden" }}
            />
          </motion.div>
        </motion.div>
      </Container>

      <LandscapePortfolio setModalOpen={setModalOpen} />
    </>
  );
};

export default LandscapePage;