import { createChart, CrosshairMode } from "lightweight-charts";
import React, { useState, useEffect, useRef, useCallback } from "react";
import TradeSpot from './TradeSpot';
import BinanceSpotMOrder from '../lib/BinanceSpotMOrder';
import BinanceSpotOrder from "../lib/BinanceSpotOrder";
import PriceChart from './PriceChart';
import Volume from './Volume';
import GetCandleSpot from '../lib/GetCandleSpot';
import Calculator from "./Calculator";
import './Candle.css';

const  CandleSpot = (props) => {
  const extract = () => {
    let target = props.pair.split(" ").splice(4, 5);
    return target.join(" ");
  }
  const extractt = () => {
    let target = props.pair.split(" ").splice(11, 3);
    return target.join(" ");
  }
  const [message, setMessage] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [limit, setLimit] = useState(extract());
  const limitRef = useRef("");
  const [currentBalance, setCurrentBalance] = useState("USDT 89.20 4 0.5");
  const currentBalanceRef = useRef("");
  const [arr, setArr] = useState(null);
  const [baseProp, setBaseProp] = useState(props.pair);
  const [api, setApi] = useState(null);
  const [cent, setCent] = useState(null);
  const [filt, setFilt] = useState(null);
  const [positionProp, setPositionProp] = useState(null);
  const [orderProp, setOrderProp] = useState(null);
  const [strPar, setStrPar] = useState(extractt());
  const strParRef = useRef("");
  const chartRef = useRef(null); 
  const timeRef = useRef(null);
  const centRef = useRef(null);
  const filtRef = useRef(null);
  const nowPriceRef = useRef("");
  const grabPriceRef = useRef("");
  const propSplit = props.pair.split(" ");
  const pair = propSplit[0].toUpperCase();

  const OpenLong = useCallback(async (e) => {
    if (isSending) return
    let safety = baseProp.split(" ").pop();
    if (safety == "true") {
      setIsSending(true);
      let priceInput = e.target.value;
      let lim = limitRef.current.value.split(" ");
      let limPrice = parseFloat(priceInput.split(" ")[0]) * (1 + parseFloat(lim[0]));
      let balParam = currentBalanceRef.current.value.split(" ");
      if (balParam.length < 2) {console.log('get current balance pls')}
      else {
        let qty = (parseFloat(balParam[1]) * parseFloat(balParam[2]) * parseFloat(balParam[3])) / limPrice;
        qty = qty.toFixed(lim[4]);
        let params = priceInput + " " + limPrice.toFixed(lim[1]) + " " + qty + " " + strParRef.current.value;
        const res = await BinanceSpotOrder(params);
        if (res == undefined) {console.log('api error')}
        else {
          console.log(res);
        }
      }
    }
    setIsSending(false);
  }, [isSending, baseProp]);

  const setBal = (e) => {
    setCurrentBalance(x => x = e.target.value);
    console.log(currentBalance);
  }
  
  const OpenShort = useCallback(async (e) => {
    if (isSending) return
    let safety = props.pair.split(" ").pop();
    if (safety == "true") {
      setIsSending(true);
      let priceInput = e.target.value;
      let lim = limitRef.current.value.split(" ");
      let limPrice = parseFloat(priceInput.split(" ")[0]) * (1 - parseFloat(lim[0]));
      let grab = longPositionRef.current.value.split(" ");
      let balParam = currentBalanceRef.current.value.split(" ");
      if (grab.length < 2) {
        console.log('get current position-like order pls')
      } 
      else if (grab.length > 1) {
        //let sizeParam = longPosition.split(" ")[1];
        let qty = Math.abs(grab[1]);
        qty = qty.toFixed(lim[4]);
        let params = priceInput + " " + limPrice.toFixed(lim[1]) + " " + qty + " " + strParRef.current.value;
        const res = await BinanceSpotOrder(params);
        if (res == undefined) {console.log('api error')}
        else {
            console.log(res);
        }
      }
      else if (balParam > 1) {
        let baseAmt = parseFloat(balParam[1]);
        baseAmt = baseAmt.toFixed(lim[4]);
        let params = priceInput + " " + limPrice.toFixed(lim[1]) + " " + baseAmt + " " + strParRef.current.value;
        const res = await BinanceSpotOrder(params);
        if (res == undefined) {console.log('api error')}
        else {
            console.log(res);
        }
      }
    } else {
      console.log("e get ass e bee in spot");
    }
    setIsSending(false);
  }, [isSending, props.pair]);

  const MOpenLong = useCallback(async (e) => {
    if (isSending) return
    let safety = baseProp.split(" ").pop();
    if (safety == "true") {
      setIsSending(true);
      let priceInput = e.target.value.split(" ");
      let lim = limitRef.current.value.split(" ");
      let balParam = currentBalanceRef.current.value.split(" ");
      if (balParam.length < 2) {console.log('get current balance pls')}
      else {
        let qty = (parseFloat(balParam[1]) * parseFloat(balParam[2]) * parseFloat(balParam[3])) / parseFloat(priceInput[0]);
        qty = qty.toFixed(lim[4]);
        let params = inputVal[0] + " " + inputVal[3] + " " + inputVal[2] + " " + inputVal[1] + " " + strParRef.current.value;
        const res = await BinanceSpotMOrder(params);
        if (res == undefined) {console.log('api error')}
        else {
          console.log(res);
        }
      }
    }
    setIsSending(false);
  }, [isSending, baseProp]);  

  const MOpenShort = useCallback(async (e) => {
    if (isSending) return
    let safety = baseProp.split(" ").pop();
    if (safety == "true") {
      setIsSending(true);
      let priceInput = e.target.value.split(" ");
      let lim = limitRef.current.value.split(" ");
      let balParam = currentBalanceRef.current.value.split(" ");
      if (balParam.length < 2) {console.log('get current balance pls')}
      else {
        let qty = (parseFloat(balParam[1]) * parseFloat(balParam[2]) * parseFloat(balParam[3])) / parseFloat(priceInput[0]);
        qty = qty.toFixed(lim[4]);
        //grabPriceRef.current.value + " BUY LONG " + pair
        let params = priceInput[0] + " " + priceInput[1] + " " + priceInput[2] + " " + priceInput[3] + " " + qty + " " + strParRef.current.value;
        const res = await BinanceSpotMOrder(params);
        if (res == undefined) {console.log('api error')}
        else {
          console.log(res);
        }
      }
    }
    setIsSending(false);
  }, [isSending, baseProp]);

  let cData = [];
  let minMove;
  let precision;
  const Caller = async () => {
    let target = props.pair.split(" ").splice(9, 2);
    minMove = target[0];
    precision = target[1];
    cData = await GetCandleSpot(props.pair);
  };
  const centCal = (e) => { 
    let val = centRef.current.value;
    setCent(e => e = val);
  }
  const filtCal = (e) => { 
    let val = filtRef.current.value;
    setFilt(e => e = val);
  }
  const grabHandler = (e) => { 
    grabPriceRef.current.value = nowPriceRef.current.value;
  }
  const timer = (a) => {
    if(timeRef.current){
      const b = new Date(a);
      const mm = b.getMinutes();
      const ss = b.getSeconds();
      let display = mm + ' : : '+ ss;
      timeRef.current.value = display;
    }
  }
  const getNow = (a) => {
    if(nowPriceRef.current){
      let price = a.c;
      nowPriceRef.current.value = price;
    }
  }
  const dummyFunc = (e) => {
    console.log(e.target.value);
  }
  const lockHandler = (e) => {
    let temp = e.target.checked;
    let currState = baseProp.split(" ");
    if (currState.length == 17) {
      let last = currState.pop();
      if (last == "true" || last == "false") {
        setBaseProp(currState.join(" ") + " " + temp);
      } else {}
    } else if (currState.length == 16) {
      setBaseProp(e => e +  " " + temp);
    } else if (currState.length < 16) {
      console.log("something went wrong with listen key");
    }
  }
  const prepareChart = () => {
    if(chartRef.current){
      const chart = createChart(chartRef.current, {
        width: 1365,
        height: 250,
        crosshair: {
          mode: CrosshairMode.Normal
        },
        layout: {
          backgroundColor: '#ffffff',
          textColor: 'rgba(0, 0, 0, 1.0)',
        },
        grid: {
          vertLines: {
            color: 'rgba(197, 203, 206, 0.5)',
            style: 1,
            visible: true,
            labelVisible: true,
          },
          horzLines: {
            color: 'rgba(197, 203, 206, 0.5)',
            style: 1,
            visible: true,
            labelVisible: true,
          },
        },
      });
      const candleSeries = chart.addCandlestickSeries({
        upColor: '#034b03',
        downColor: '#ff0000', 
        borderDownColor: 'rgba(255, 0, 0, 1)',
        borderUpColor: 'rgba(3, 125, 3, 1)',
        wickDownColor: 'rgba(255, 0, 0, 1)',
        wickUpColor: 'rgba(3, 125, 3, 1)',
        priceFormat: {
          minMove: minMove,
          precision: precision,
        }
      });
      chart.applyOptions({
        priceScale: {
          borderColor: 'rgba(197, 203, 206, 0.8)',
          position: 'right',
          autoScale: true,
          alignLabels: true,
          borderVisible: true,
          borderColor: '#555ffd',
          drawTicks: true,
          scaleMargins: {
            top: 0.30,
            bottom: 0.25,
          },
        },
         timeScale: {
          borderColor: 'rgba(197, 203, 206, 0.8)',
          visible: true,
          timeVisible: true,
          secondsVisible: true,
          fixRightEdge: true,
          borderVisible: true,
          rightBarStayOnScroll: true,
        },
      });
      chart.timeScale().fitContent();
      let fData;
      if (cData == undefined) {
        console.log("no kline api data");
      } else {
        fData = cData.map((x)=> { 
          return { 
            time: (x[0] / 1000) + 3600, 
            open: x[1],
            high: x[2],
            low: x[3],
            close: x[4]
          }; 
        });
        candleSeries.setData(fData);
        setApi(e => e = cData);
      }  
      const connect = () => {
        const baseURL = "wss://stream.binance.com:9443";
        const klineStream = `/stream?streams=${propSplit[0].toLowerCase()}@kline_${propSplit[1]}`;
        const streamm = `${klineStream}/${propSplit[15]}`;
        const bsoc = new WebSocket(baseURL + streamm);
        bsoc.onmessage = (event) => {	
          const update = JSON.parse(event.data);
          if (update.data.e == "kline") {
            const message = update.data;
            candleSeries.update({
              time: ( message.k.t / 1000) + 3600, 
              open:  message.k.o,
              high:  message.k.h,
              low:  message.k.l,
              close:  message.k.c
            });
            timer(message.E);
            getNow(message.k);
            if (message.k.x == true ) {
              setMessage(message);            
              let m = message.k;
              let newArr = [];
              newArr.push(m.t);
              newArr.push(m.o);
              newArr.push(m.h);
              newArr.push(m.l);
              newArr.push(m.c);
              newArr.push(m.v);
              newArr.push(m.T);
              newArr.push(m.q);
              newArr.push(m.n);
              newArr.push(m.V);
              newArr.push(m.Q);
              newArr.push(m.B);
              setArr(e => e = newArr);
             // if (cData[cData.length - 1][0] < message.k.t ) {}
            }
          }
          if (update.data.e == "outboundAccountPosition") {
            setPositionProp(update.data.B);
          }
          if (update.data.e == "executionReport") {
            setOrderProp(update.data);
          }
        };
        bsoc.onclose = (e) => {
          console.log('Socket is closed. Reconnect will be attempted in 3 second.', e.reason);
          setTimeout(() => {
          connect();
          }, 3000);
        };
        bsoc.onerror = (err) => {
          console.error('My Socket encountered error: ', err.message, 'Closing socket');
          bsoc.close();
        };
      }
      connect();
    } 
  }
  useEffect(() => {
    Caller();
    let timer = setTimeout(()=> prepareChart(), 3100);
    return () => {
      clearTimeout(timer);
    }
  }, []); 

  return (
      <div>
        <div className='tradeSection'>
          <div className='tradeCategory'>
            <div className='toogleFlex'>
              <label className="switch">
                <input type="checkbox" name="toggle" onClick={lockHandler}></input>
                <span className="slider round"></span>
              </label>  
            </div>  
            <div className='timeFlex'>
              <input className='timeInput' ref={timeRef} type="text" />
            </div> 
            <div className='currentFlex'>
              <input className='currentInput' ref={nowPriceRef} type="text" />
              <button className='balButtonn' type="button" disabled={isSending} value={ nowPriceRef.current.value + " BUY " + pair} onClick={MOpenLong}>B</button>
              <button className='balButtonn' type="button" disabled={isSending} value={nowPriceRef.current.value + " SELL " + pair} onClick={dummyFunc}> S</button>
              <button className='balButtonn' type="button" disabled={isSending} onClick={grabHandler}> G</button>
            </div>
            <div className='balFlexx'>
              <input className='balInputt' ref={grabPriceRef} type="text" />
              <button className='balButtonn' type="button" disabled={isSending} value={grabPriceRef.current.value + " BUY " + pair} onClick={OpenLong}>B</button>
              <button className='balButtonn' type="button" disabled={isSending} value={grabPriceRef.current.value + " SELL " + pair} onClick={OpenShort}>S</button>
            </div> 
            <div className='balFlexx'>
              <select className='strInputcan' onChange={(e) => setStrPar(e.target.value)}> 
                <option value="">o</option>
                <option value="STOP_LOSS_LIMIT GTC FALSE">StopLimit GTC</option>
                <option value="STOP_LOSS_LIMIT IOC FALSE">StopLimit IOC</option>
                <option value="STOP_LOSS_LIMIT FOK FALSE">StopLimit GTC</option>
                <option value="MARKET FOK FALSE">Market FOK</option>
                <option value="LIMIT IOC FALSE">Market IOC</option>
              </select>
              <input ref={strParRef} className="balInput" type="text" onChange={(e) => setStrPar(e.target.value)} value={strPar ? strPar : ""} />
            </div>   
            <div className='limFlex'>
              <input ref={currentBalanceRef} className="limInput" type="text" onChange={setBal} value={currentBalance ? currentBalance : ""} />
            </div>
            <div className='limFlex'>
              <input ref={limitRef} className="limInput" type="text" onChange={(e) => setLimit(e.target.value)} value={limit ? limit : ""} />
            </div>
          </div>
        </div>
        <div className='candlecat' ref={chartRef} />
        <TradeSpot kline={message} batch={api} pair={baseProp} order={orderProp} position={positionProp} />
        <PriceChart batch={api} kline={arr} />
        <Volume batch={api} kline={arr} />
        <input type='text' name='cent' className='category' placeholder='Cent' ref={centRef} />
        <input type='text' name='filter' className='category' placeholder='filter' ref={filtRef} />
        <button onClick={centCal} >Calc</button>
        <button onClick={filtCal}>Filt</button>
        <Calculator batch={api} pair={props.pair} cent={cent} filt={filt} />
      </div>
     );  
}
export default CandleSpot;

