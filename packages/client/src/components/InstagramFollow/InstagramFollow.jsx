import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram,  } from "@fortawesome/free-brands-svg-icons";
import "./InstagramFollow.css";
import { useTheme } from "../../providers/ThemeProvider";

function InstagramFollow() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="instagram-container">
      <a
        href="https://www.instagram.com/picsbyschick"
        className={`instagram social ${isDark ? "text-white" : "text-dark"}`}
        target="_blank"
      >
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
    </div>
  );
}

export default InstagramFollow;