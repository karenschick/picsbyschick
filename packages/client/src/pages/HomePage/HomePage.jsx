import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";
import {
  AllCarousels,
  HomeCarousel,
  WildlifePortfolio,
} from "../../components";
import { AboutMePage } from "..";
import FadeInSection from "../../utils/FadeInSection";
import "../../app.css";


const HomePage = () => {

  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const contentVariants = {
    hidden: { x: "-100vw" },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 50, damping: 20 },
    },
  };

  return (
    <>
      <Container
        className="mt-0 pt-0"
        style={{
          height: "100vh",
          alignContent: "center",
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            onClick={() => navigate("/AboutMePage")}
            style={{ cursor: "pointer" }}
            whileHover={{ scale: 1.03 }}
            variants={contentVariants}
          >
            <motion.div
              style={{
                height: "100%",
                paddingTop: "30px",
                boxSizing: "border-box",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 50 }}
            >
              <HomeCarousel />
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      <FadeInSection>
        <AboutMePage />
      </FadeInSection>
    </>
  );
};

export default HomePage;