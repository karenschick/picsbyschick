import React from "react";
import { AllCarousels } from "../../components";
import "../../app.css";

const AllCarouselsPage = () => {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center", // Horizontal centering
          alignItems: "center", // Vertical centering
          padding: "1rem", //  avoid content touching edges
        }}
      >
        <AllCarousels fromHome />
      </div>
    </>
  );
};

export default AllCarouselsPage;