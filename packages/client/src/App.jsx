import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  AboutMePage,
  
  HomePage,
  FlowerPage,
  LandscapePage,
  WildlifePage,
} from "./pages";
import { Navigation, BackgroundCarousel, AllCarousels } from "./components";

const App = () => {
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false);

  return (
    <>
      <BackgroundCarousel />
      <div>
        <Navigation isModalOpen={portfolioModalOpen} />
        <Routes>
          <Route path="/" element={<HomePage />} />
         
          <Route path="/AboutMePage" element={<AboutMePage />} />
          <Route
            path="/LandscapePage"
            element={<LandscapePage setModalOpen={setPortfolioModalOpen} />}
          />
          <Route path="/FlowerPage" element={<FlowerPage />} />
          <Route
            path="/WildlifePage"
            element={<WildlifePage setModalOpen={setPortfolioModalOpen} />}
          />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </>
  );
};

export default App;