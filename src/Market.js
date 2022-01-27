import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from 'react-router-dom';
import GLineChart from './components/GLineChart';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import Candle from './components/Candle';
import GetOpen from './lib/GetOpen';
import GetGlobal from './lib/GetGlobal';
import GetTopAccount from './lib/GetTopAccount';
import GetTopPosition from './lib/GetTopPosition';
import uGetGlobal from './lib/uGetGlobal';
import uGetOpen from './lib/uGetOpen';
import uGetTopAccount from './lib/uGetTopAccount';
import uGetTopPosition from './lib/uGetTopPosition';
import uGetTakers from './lib/uGetTakers';
import GetTakers from './lib/GetTakers';
import './Market.css';
import spinner from './Spinner';

const  Market = (props) => {
  const [isSending, setIsSending] = useState(false);
  const [glineData, setGlineData] = useState(null);
  const [lineData, setLineData] = useState(null);
  const [barData, setBarData] = useState(null);
  const audioRef = useRef(null);
  const location = useLocation();
  const symbol = location.state.pair;
  const propInterval = symbol.split(" ")[1];

  const playHandler = () => {
    audioRef.current.play();
  }
  const pauseHandler = () => {
    audioRef.current.pause();
  } 

  let GRatio = [];
  let OpenInt = [];
  let GDtime = [];
  let ODtime = [];
  let ARatio = [];
  let PRatio = [];
  let ADtime = [];
  let PDtime = [];
  let BuyVol = [];
  let SellVol = [];
  let TDtime = [];

  const alarm = () => { 
    const dG = 100 * Math.abs(GRatio[GRatio.length - 1] - GRatio[GRatio.length - 2]) / GRatio[GRatio.length - 2];
    const dO = 100 * Math.abs(OpenInt[OpenInt.length - 1] - OpenInt[OpenInt.length - 2]) / OpenInt[OpenInt.length - 2];
    return  [dG, dO];
  };

  const tuple = () => {
    let result = [];
    for (let i = 1; i < GRatio.length - 1; i++) {
      let prev = GRatio[i - 1];
      let prevv = OpenInt[i - 1];
      let prevvv = GDtime[i - 1];
      let dG = 100 * Math.abs(GRatio[i] - prev) / prev;
      let dO = 100 * Math.abs(OpenInt[i] - prevv) / prevv;
      let dT = 100 * Math.abs(GDtime[i] - prevvv) / prevvv;
      result.push([dG, dO, dT]);
    }
    return result;
  }
  const tupleGen = () => {
    let arr = tuple();
    console.log(arr);
  }

  const GetGDOD = async (e) => {
    const GData = await GetGlobal(symbol);
    const OData = await GetOpen(symbol);
    GRatio = GData.map(x => parseFloat(x.longShortRatio));
    OpenInt = OData.map(x => parseFloat(x.sumOpenInterest));
    GDtime = GData.map(x => parseFloat(x.timestamp));
    ODtime = OData.map(x => parseFloat(x.timestamp));
    setGlineData(e => e = {GDtime, GRatio, OpenInt});
  }

  const GetADPD = async () => {
    const AData = await GetTopAccount(symbol);
    const PData = await GetTopPosition(symbol);
    ARatio = AData.map(x => parseFloat(x.longShortRatio));
    PRatio = PData.map(x => parseFloat(x.longShortRatio));
    ADtime = AData.map(x => parseFloat(x.timestamp));
    PDtime = AData.map(x => parseFloat(x.timestamp));
    setLineData(e => e = {ADtime, ARatio, PRatio});
  }

  const GetTD = async () => {
    const TData = await GetTakers(symbol);
    BuyVol = TData.map(x => parseFloat(x.buyVol));
    SellVol = TData.map(x => parseFloat(x.sellVol));
    TDtime = TData.map(x => parseFloat(x.timestamp));
    setBarData(e => e = {TDtime, BuyVol, SellVol});
  }

  const UpdateGDOD = async () => {
    let Gdata = await uGetGlobal(symbol);
    let Odata = await uGetOpen(symbol);
    if (GDtime[GDtime.length - 1] < parseFloat(Gdata[0].timestamp) && ODtime[ODtime.length - 1] < parseFloat(Odata[0].timestamp)) {
      GRatio.push(parseFloat(Gdata[0].longShortRatio));
      OpenInt.push(parseFloat(Odata[0].sumOpenInterest));
      GDtime.push(parseFloat(Gdata[0].timestamp));
      ODtime.push(parseFloat(Odata[0].timestamp));
      setGlineData(e => e = {GDtime, GRatio, OpenInt});
      GRatio.shift();
      OpenInt.shift();
      GDtime.shift();
      ODtime.shift();
    } else {}
  }
  const UpdateADPD = async () => {
    let Adata = await uGetTopAccount(symbol);
    let Pdata = await uGetTopPosition(symbol);
    if (ADtime[ADtime.length - 1] < parseFloat(Adata[0].timestamp) && PDtime[PDtime.length - 1] < parseFloat(Pdata[0].timestamp)) {
      ARatio.push(parseFloat(Adata[0].longShortRatio));
      PRatio.push(parseFloat(Pdata[0].longShortRatio));
      ADtime.push(parseFloat(Adata[0].timestamp));
      PDtime.push(parseFloat(Pdata[0].timestamp));
      setLineData(e => e = {ADtime, ARatio, PRatio});
      ARatio.shift();
      PRatio.shift();
      ADtime.shift();
      PDtime.shift();
    } else {}
  }
  const UpdateTD = async () => {
    let Tdata = await uGetTakers(symbol);
    if (TDtime[TDtime.length - 1] < parseFloat(Tdata[0].timestamp)) {
      BuyVol.push(parseFloat(Tdata[0].buyVol));
      SellVol.push(parseFloat(Tdata[0].sellVol));
      TDtime.push(parseFloat(Tdata[0].timestamp));
      setBarData(e => e = {TDtime, BuyVol, SellVol});
      BuyVol.shift();
      SellVol.shift();
      TDtime.shift();
    } else {}
  }

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      GetGDOD();
      GetADPD();
      GetTD();
      //console.log(location);
     // window.addEventListener("scroll", pauseHandler, { passive: true });
    }
    return () => {
      ignore = true; 
     // window.removeEventListener("scroll", pauseHandler);
    }
  }, []);
  useEffect(() => {
    let ignore = false;
    let interval;
    if (propInterval == "5m") {
      interval = 70000;
    } else {
      interval = 300000;
    }
    const dFunc = () => {
      if (!ignore) {
        UpdateGDOD();
        UpdateADPD();
        UpdateTD();
      }
    }
    let timer = setInterval(()=> dFunc(), interval);
    return () => {
      ignore = true;
      clearInterval(timer);
    }
  }, []); 

  return (
    <div>
      <GLineChart glineData={glineData} />
      <LineChart lineData={lineData} />
      <Candle pair={symbol} glineData={glineData} lineData={lineData} />
      <BarChart barData={barData} />
    </div>
  );
}

export default Market;
//
