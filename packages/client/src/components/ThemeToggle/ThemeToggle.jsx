import React from "react";
import { useTheme } from "../../providers/ThemeProvider";
import { motion } from "framer-motion";
import "./ThemeToggle.css";
import "../../app.css";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const bounce = {
    duration: 1.2,
    ease: bounceEase,
  };

  return (
    <div className="theme-toggle-container">
      <div
        className="switch"
        data-is-on={isDark}
        onClick={toggleTheme}
        role="button"
        aria-pressed={isDark}
      >
        <motion.div
          className="ball"
          animate={{ x: isDark ? 60 : 0 }}
          transition={isDark ? bounce : spring}
        >
          
        </motion.div>
      </div>
      
    </div>
  );
}

// Animation constraints
const bounceEase = (x) => {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
};
const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

export default ThemeToggle;