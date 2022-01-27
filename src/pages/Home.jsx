import React from "react";
import HeaderBar from "../componentsapp/HeaderBar";
import Categories from "../componentsapp/Categories";
import Footer from "../componentsapp/Footer";
import Navbar from "../componentsapp/Navbar";
import Newsletter from "../componentsapp/Newsletter";
import Products from "../componentsapp/Products";
import Slider from "../componentsapp/Slider";

const Home = () => {
  return (
    <div>
      <HeaderBar />
      <Navbar />
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;
// <Slider />
//<Categories />
//<Products/>
