import React, { useState, useEffect } from "react";
import Analysiss from '../lib/Analysiss';
import './calc.css';

const Timer = (props) => {
  const [result, setResult] = useState(null);
  const [long, setLong] = useState(null);

  const timer = (a) => {
    if(timeRef.current){
      const b = new Date(a);
      const mm = b.getMinutes();
      const ss = b.getSeconds();
      let display = ' MM '+ mm + ' SS '+ ss;
      timeRef.current.innerText = display;
    }
  }

  useEffect(() => {
    let ignore = false;
    if (!ignore) centCal();
    return (() => { ignore = true })
  }, [props.cent]);

  return (
    <div className='categoryy'>
      
    </div>
  );
};
export default Timer;
