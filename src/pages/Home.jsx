import React from "react";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import "./Home.css"

const Home = () => {
  return (
    <div className="flex__center flex--column">
      <h2 className="headtext__opensans">Hospital Information Management System</h2>
      <div>
        <div className="slider">
          <span><img src={img1} alt="" /></span>
          <span><img src={img2} alt="" /></span>
          <span><img src={img3} alt="" /></span>
          <span><img src={img4} alt="" /></span>
          <span><img src={img1} alt="" /></span>
          <span><img src={img2} alt="" /></span>
          <span><img src={img3} alt="" /></span>
          <span><img src={img4} alt="" /></span>
        </div>
      </div>
    </div>
  );
};
export default Home;