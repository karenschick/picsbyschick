import React from "react";
import { AllCarousels } from "../../components";
import { Card, Container } from "react-bootstrap";
import { useTheme } from "../../providers/ThemeProvider";
import FadeInSection from "../../utils/FadeInSection";
import "../../app.css";

const AboutMePage = () => {
  // Access current theme
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <Container className="">
        <section>
          <FadeInSection>
            <p
              className="mt-5 mb-5 card-subtitle"
              style={{
                color: isDark ? "#fff" : "#000",
              }}
            >
              Welcome, and thank you for visiting picsbyschick! I'm a
              nature photographer based in the beautiful landscapes of New
              Hampshire, where I’m constantly inspired by the quiet magic of
              wildflowers, forests, mountains, and the incredible wildlife that
              calls this region home.
            </p>
          </FadeInSection>

          <FadeInSection>
            <div className="mt-5 mb-5 pt-5 pb-5">
              <AllCarousels fromHome={false} />
            </div>
          </FadeInSection>

          <FadeInSection>
            <p
              className="mt-5 mb-5 card-subtitle"
              style={{
                color: isDark ? "#fff" : "#000",
              }}
            >
              My photography is a reflection of my deep appreciation for the
              natural world. Whether I'm capturing a quiet woodland scene or a
              fleeting moment with creatures in the wild, I aim to preserve the
              sense of wonder these encounters bring.
            </p>
            <p
              className="mt-5 mb-5 card-text"
              style={{
                color: isDark ? "#fff" : "#000",
              }}
            >
              "Photography is the beauty of life captured." - Tara Chisolm
            </p>
          </FadeInSection>
        </section>
      </Container>
    </>
  );
};

export default AboutMePage;