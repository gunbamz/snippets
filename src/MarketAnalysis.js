import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Candle from './components/Candle';

const  MarketAnalysis = (props) => {
  const [param, setParam] = useState(null);
  const location = useLocation();
  // const starter = () => {
  //    console.log(location);
  // }
  
  useEffect(() => {
    //starter();
  },[])
  return (
    <div>
      <Candle pair={location.state.pair} />
    </div>
  );
}
export default MarketAnalysis;