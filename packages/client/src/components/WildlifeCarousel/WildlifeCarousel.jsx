import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import getOrientation from "../../utils/getOrientation";
import wildlife from "../../portfolios/wildlife";

function WildlifeCarousel({
  className = "",
  style = {},
  mode = "full",
  customHeight = null,
  preferredOrientation = "landscape",
}) {
  // Initial portfolio data (image, title and location)
  const [portfolios, setPortfolios] = useState([]);

  // useEffect runs once when the compent mounts due to empty dependency array
  useEffect(() => {
    // Define an async function inside useEffect
    const loadPortfoliosWithOrientation = async () => {
      // Wait for all portfolio items to be processed
      const updatedPortfolios = await Promise.all(
        wildlife.map(async (item) => {
          try {
            const orientation = await getOrientation(item.img);
            return { ...item, orientation };
          } catch (error) {
            console.error("Orientation failed for: ", item.img, error);
            return { ...item, orientation: "landscape" };
          }
        })
      );

      if (mode === "preview") {
        const filtered = updatedPortfolios.filter(
          (p) => p.orientation === preferredOrientation
        );
        setPortfolios(filtered.length ? filtered : [updatedPortfolios[0]]);
      } else {
        setPortfolios(updatedPortfolios);
      }
    };

    loadPortfoliosWithOrientation();
  }, [mode, preferredOrientation]);

  return (
    <>
      <div
        style={{ position: "relative", zIndex: 1, ...style }}
        className={className}
      >
        <Carousel
          fade
          pause={mode === "full" ? true : false}
          interval={mode === "full" ? 3000 : null}
          indicators={false}
          controls={false}
        >
          {portfolios.map((portfolio, index) => (
            <Carousel.Item key={index}>
              <div
                className="carousel-image-wrapper"
                style={{
                  height: customHeight || (mode === "full" ? "800px" : "250px"),
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  className="d-block w-100 carousel-image"
                  src={`${portfolio.img}`}
                  alt={`${index + 1}`}
                  loading="lazy"
                  style={{
                    maxHeight: "100%",

                    width:
                      portfolio.orientation === "portrait" ||
                      portfolio.orientation === "square"
                        ? "auto"
                        : "100%",
                    height:
                      portfolio.orientation === "portrait" ||
                      portfolio.orientation === "square"
                        ? "100%"
                        : "auto",
                    objectFit:
                      portfolio.orientation === "portrait" ||
                      portfolio.orientation === "square"
                        ? "contain"
                        : "cover",
                    transition:
                      "object-fit 0.3s ease, width 0.3s ease, height 0.3s ease",
                  }}
                  fluid
                />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default WildlifeCarousel;