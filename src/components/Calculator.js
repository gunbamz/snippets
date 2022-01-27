import React, { useState, useEffect } from "react";
import Analysiss from '../lib/Analysiss';
import './calc.css';

const Calculator = (props) => {
  const [result, setResult] = useState(null);
  const [long, setLong] = useState(null);
  const [short, setShort] = useState(null);
  const [Blong, setBLong] = useState(null);
  const [Bshort, setBShort] = useState(null);
  const [longCount, setLongCount] = useState(null);
  const [shortCount, setShortCount] = useState(null); 

  const getData = () => {
    if (props.batch == null) {} 
    else {
      const cent = parseFloat(props.pair.split(" ")[3]);
      const analysis = Analysiss(props.batch, cent);
      setResult(analysis.result);
      setLong(analysis.long);
      setShort(analysis.short);
      setBLong(analysis.Blong);
      setBShort(analysis.Bshort);
      setLongCount(analysis.longCount);
      setShortCount(analysis.shortCount);
    }
  }
  
  const centCal = () => {
    if (props.batch == null) { } 
    else {
      const cent = parseFloat(props.cent);
      const analysis = Analysiss(props.batch, cent);
      setResult(analysis.result);
      setLong(analysis.long);
      setShort(analysis.short);
      setBLong(analysis.Blong);
      setBShort(analysis.Bshort);
      setLongCount(analysis.longCount);
      setShortCount(analysis.shortCount);
    }
  }
    
  useEffect(() => {
    let ignore = false;
    if (!ignore) getData();
    return (() => { ignore = true })
  }, [props.batch]);

  useEffect(() => {
    let ignore = false;
    if (!ignore) centCal();
    return (() => { ignore = true })
  }, [props.cent]);

  return (
    <div className='categoryy'>
      <p>Long: {long}/{longCount && longCount.length} &nbsp;&nbsp;&nbsp;<span> BLong: {Blong}/{longCount && longCount.length}</span></p> 
      <p>Short: {short}/{shortCount && shortCount.length} &nbsp;&nbsp;&nbsp;<span> BShort: {Bshort}/{shortCount && shortCount.length}</span></p>
      <p>LoResult: {result && result.filter(x => x.type == 'GL').map((a, b) => (<span key={b}>{a.type}&nbsp;{a.time}&nbsp;&nbsp;&nbsp;</span>))}</p>
      <p>ShResult: {result && result.filter(x => x.type == 'GS').map((a, b) => (<span key={b}>{a.type}&nbsp;{a.time}&nbsp;&nbsp;&nbsp;</span>))}</p>
      <p>LoCount: {longCount && longCount.map((a, b) => (<span key={b}>{a}&nbsp;&nbsp;&nbsp;</span>))}</p>
      <p>ShCount: {shortCount && shortCount.map((a, b) => (<span key={b}>{a}&nbsp;&nbsp;&nbsp;</span>))}</p>
    </div>
  );
};
export default Calculator;
