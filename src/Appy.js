import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";
const Appy = () => {
  return (
    <RestaurantsContextProvider>
      <div className="container">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants/:id/update" element={<UpdatePage />} />
            <Route path="/reviews/:id" element={<RestaurantDetailPage />} />
            <Route path="/review/:id" element={<RestaurantDetailPage />} />
          </Routes>
        </Router>
      </div>
    </RestaurantsContextProvider>
  );
};

export default Appy;
