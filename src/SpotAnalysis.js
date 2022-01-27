import React from "react";
import { useLocation } from 'react-router-dom';
import CandleSpot from './components/CandleSpot';


const  SpotAnalysis = (props) => {
  let location = useLocation();
  const symbol = location.state.pair; 

  return (
    <div>
      <CandleSpot pair = {symbol} />
    </div>
  );
}

export default SpotAnalysis;