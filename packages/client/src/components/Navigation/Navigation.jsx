import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import ContactForm from "../ContactForm/ContactForm";
import InstagramFollow from "../InstagramFollow/InstagramFollow";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useTheme } from "../../providers/ThemeProvider";
import "./Navigation.css";

const Navigation = ({ isModalOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contactModalShow, setContactModalShow] = useState(false);
  const handleShowModal = () => {
    console.log("modal should open now");
    setContactModalShow(true);
  };
  const handleCloseModal = () => setContactModalShow(false);
  const [animationReady, setAnimationReady] = useState(false); // Track when the animation should start
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

  const location = useLocation();
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const videoSrc = isDark
    ? "picsbyschickJULIUSdarktheme.mp4"
    : "picsbyschickJULIUSlighttheme.mp4";

  useEffect(() => {
    setAnimationReady(false);
    const timeout = setTimeout(() => {
      setAnimationReady(true);
    }, 100); // adjust delay if needed

    return () => clearTimeout(timeout);
  }, [location.pathname]); // this runs on initial load AND on route changes

  if (isModalOpen) return null;

  return (
    <>
      {/* Navigation Button Animation */}

      {animationReady && (
        <motion.button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Menu"
          // initial={{ opacity: 0, x: "850%" }}
          // animate={{ opacity: 1, y: "50%", x: "50%" }}
          //
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: [3, 1] }} // enlarges and returns to normal
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          style={{
            position: "fixed",
            top: "3%",
            left: "2%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <motion.div
            animate={{
              rotate: isOpen ? 45 : 0,
              scale: isOpen ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
            style={{
              width: "20vw",
              height: "20vw",
              maxWidth: "200px",
              maxHeight: "200px",
              minWidth: "150px",
              minHeight: "150px",
              overflow: "hidden",
              borderRadius: "50%",
            }}
          >
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </motion.div>

          <motion.path
            variants={{
              closed: { d: "M 2 2.5 L 20 2.5" },
              open: { d: "M 3 16.5 L 17 2.5" },
            }}
            animate={isOpen ? "open" : "closed"}
          />
          <motion.path
            d="M 2 9.423 L 20 9.423"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            initial={{ opacity: 1 }}
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.1 }}
          />
          <motion.path
            variants={{
              closed: { d: "M 2 2.5 L 20 2.5" },
              open: { d: "M 3 16.5 L 17 2.5" },
            }}
            animate={isOpen ? "open" : "closed"}
          />
        </motion.button>
      )}

      {/* Full-Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`nav-overlay ${
              isDark ? "text-white" : "nav-text-light"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: isDark
                ? "rgba(0,0,0,0.95)"
                : "rgba(255,255,255,0.95)",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                alignItems: "center",
              }}
            >
              <ThemeToggle />

              <Link to="/" className="nav-link" onClick={closeMenu}>
                Home
              </Link>
              <Link to="/FlowerPage" className="nav-link" onClick={closeMenu}>
                Flowers
              </Link>
              <Link
                to="/LandscapePage"
                className="nav-link"
                onClick={closeMenu}
              >
                Landscape
              </Link>
              <Link to="/WildlifePage" className="nav-link" onClick={closeMenu}>
                Wildlife
              </Link>
              <InstagramFollow className="nav-link" />
              <Button
                className=" mt-3"
                style={{
                  fontFamily: '"Julius Sans One", sans-serif',
                  fontWeight: "bold",
                }}
                variant={isDark ? "light" : "dark"}
                onClick={() => {
                  closeMenu();
                  setContactModalShow(true);
                }}
              >
                Contact
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <Modal
        show={contactModalShow}
        onHide={handleCloseModal}
        size="sm"
        centered
        backdrop="true"
        keyboard={true}
        contentClassName={isDark ? "bg-dark text-white" : "bg-light text-dark"}
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              fontFamily: '"Julius Sans One", sans-serif',
            }}
          >
            Contact
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ContactForm onClose={() => setContactModalShow(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Navigation;
