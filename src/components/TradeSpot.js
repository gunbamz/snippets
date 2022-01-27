import React, { useState, useEffect, useCallback, useRef } from "react";
import BinanceSpotMOrder from '../lib/BinanceSpotMOrder';
import BinanceSpotOrder from "../lib/BinanceSpotOrder";
import BinanceSpotLOrder from "../lib/BinanceSpotLOrder";
import GetAccount from '../lib/GetAccount';
import GetOpenOrderSpot from '../lib/GetOpenOrderSpot';
import OrderSpot from './OrderSpot';
import './Trade.css'; 

const TradeSpot = React.memo((props) => {
  const extract = () => {
    let target = props.pair.split(" ").splice(4, 5);
    return target.join(" ");
  }
  const extractt = () => {
    let target = props.pair.split(" ").splice(12, 2);
    return target.join(" ");
  }
  const [currentOrderProp, setCurrentOrderProp] = useState(null);
  const [highPrice, setHighPrice] = useState(null);
  const [openPrice, setOpenPrice] = useState(null);
  const [closePrice, setClosePrice] = useState(null);
  const [lowPrice, setLowPrice] = useState(null);
  const [avPrice, setAvPrice] = useState(null);
  const [nHighPrice, setNHighPrice] = useState(null);
  const [nOpenPrice, setNOpenPrice] = useState(null);
  const [nClosePrice, setNClosePrice] = useState(null);
  const [nLowPrice, setNLowPrice] = useState(null);
  const [nAvPrice, setNAvPrice] = useState(null);
  const [limit, setLimit] = useState(extract());
  const limitRef = useRef("");
  const [currentBalance, setCurrentBalance] = useState("100 100");
  const currentBalanceRef = useRef("");
  const [isSending, setIsSending] = useState(false);
  const [longPosition, setLongPosition] = useState("");
  const [limitSafe, setLimitSafe] = useState("");
  const [shortPosition, setShortPosition] = useState("");
  const [strPar, setStrPar] = useState(extractt());
  const longPositionRef = useRef("");
  const shortPositionRef = useRef("");
  const strParRef = useRef("");
  const pair = props.pair.split(" ")[0].toUpperCase();
  const baseLen = props.pair.split(" ")[14];
  const splitter = (value, b) => value.substring(0, value.length - b) + " " + value.substring(value.length - b);

  const avR = (a) => {
    let lim = limitRef.current.value.split(" ");
    let high = parseFloat(a.h);
    let low = parseFloat(a.l);
    let open = parseFloat(a.o);
    let close = parseFloat(a.c);
    let ave = (high/4 + low/4 + open/4 + close/4).toFixed(lim[2]);
    setAvPrice(e => e = ave)
  }
  const navR = (a) => {
    let lim = limitRef.current.value.split(" ");
    let high = parseFloat(a.h);
    let low = parseFloat(a.l);
    let open = parseFloat(a.o);
    let close = parseFloat(a.c);
    let ave = (high/4 + low/4 + open/4 + close/4).toFixed(lim[2]);
    setNAvPrice(e => e = ave);
  }

  const StopOrder = useCallback(async (e) => {
    if (isSending) return
    let safety = props.pair.split(" ").pop();
    let lim = limitRef.current.value.split(" ");
    if (safety == "true") {
      setIsSending(true);
      let buttonVal = e.target.value;
      let checker = e.target.value.split(" ")[1];
      let balParam = currentBalanceRef.current.value.split(" ");
      if (checker == 'BUY') {
        let limPrice = parseFloat(buttonVal.split(" ")[0]) * (1 + parseFloat(lim[0]));
        if (balParam.length > 1) {
          let qty = parseFloat(balParam[0]) / parseFloat(buttonVal.split(" ")[0])
          qty = qty.toFixed(lim[4]);
          let params = buttonVal + " " + limPrice.toFixed(lim[2]) + " " + qty + " " + strParRef.current.value;
          const res = await BinanceSpotOrder(params);
          if (res == undefined) {console.log('api error')}
          else {
              console.log(res);
          }
        }
      } else {
        let limPrice = parseFloat(buttonVal.split(" ")[0]) * (1 - parseFloat(lim[0]));
        let grab = longPositionRef.current.value.split(" ");
        if (grab.length > 1) {
          let qty = Math.abs(grab[1]);
          qty = qty.toFixed(lim[4]);
          let params = buttonVal + " " + limPrice.toFixed(lim[2]) + " " + qty + " " + strParRef.current.value;
          const res = await BinanceSpotOrder(params);
          if (res == undefined) {console.log('api error')}
          else {
              console.log(res);
          }
        } 
        else if (balParam.length > 1) {
          let qty = Math.abs(grab[1]);
          qty = qty.toFixed(lim[4]);
          let params = buttonVal + " " + limPrice.toFixed(lim[2]) + " " + qty + " " + strParRef.current.value;
          const res = await BinanceSpotOrder(params);
          if (res == undefined) {console.log('api error')}
          else {
              console.log(res);
          }
        } else {
          console.log("no approriate sell qty");
        }
      }
    } else {
      console.log("e get ass e bee in spot lock");
    }
    setIsSending(false);
  }, [isSending, props.pair]);

  const LimitOrder = useCallback(async (e) => {
    if (isSending) return
    let safety = props.pair.split(" ").pop();
    let lim = limitRef.current.value.split(" ");
    let ls = e.target.value.split(" ");
    let limSafe = (ls[2] == "SELL" && ls[5] == "RED") || (ls[2] == "BUY" && ls[5] == "GREEN");
    if (safety == "true" && limSafe == true) {
      setIsSending(true);
      let checker = ls[1];
      let balParam = currentBalanceRef.current.value.split(" ");
      if (ls[1] == 'BUY') {
        if (balParam.length > 1) {
          //let quoteAmt = parseFloat(balParam[1]);
          let qty = parseFloat(balParam[0]) / parseFloat(ls[0])
          qty = qty.toFixed(lim[4]);
          let discard = ls.pop();
          let params = ls.join(" ") + " " + qty + " " + strParRef.current.value;
          const res = await BinanceSpotLOrder(params);
          if (res == undefined) {console.log('api error')}
          else {
              console.log(res);
          }
        } else {
          console.log("current balance not complete")
        }
      } else {
        let grab = longPositionRef.current.value.split(" ");
        if (grab.length > 1) {
          let qty = Math.abs(grab[1]);
          qty = qty.toFixed(lim[4]);
          let discard = ls.pop();
          let params = ls.join(" ") + " " + qty + " " + strParRef.current.value;
          const res = await BinanceSpotLOrder(params);
          if (res == undefined) {console.log('api error')}
          else {
              console.log(res);
          }
        } ///point
        else if (balParam.length > 1) {
          let qty = parseFloat(balParam[1]);
          qty = qty.toFixed(lim[4]);
          let discard = ls.pop();
          let params = ls.join(" ") + " " + qty + " " + strParRef.current.value;
          const res = await BinanceSpotLOrder(params);
          if (res == undefined) {console.log('api error')}
          else {
              console.log(res);
          }
        } else {
          console.log("no approriate sell qty");
        }
      }
    } else {
      console.log("e get ass e bee in spot lock");
    }
    setIsSending(false);
  }, [isSending, props.pair]);

  const MarketSell = useCallback(async (e) => {
    if (isSending) return
    let safety = props.pair.split(" ").pop();
    if (safety == "true") {
      setIsSending(true);
      let inputVal = e.target.value.split(" ");
      let grab = longPositionRef.current.value.split(" ");
      let balParam = currentBalanceRef.current.value.split(" ");
      if (grab.length < 2) {
        console.log('get current pair balance pls')
      } 
      else if (grab.length > 1) {
        let params = inputVal[0] + " " + inputVal[3] + " " + inputVal[2] + " " + inputVal[1] + " " + strParRef.current.value;
        const res = await BinanceSpotMOrder(params);
        if (res == undefined) {console.log('api error')}
        else {
          console.log(res);
        }
      }
      else if (balParam > 1) {
        let baseAmt = parseFloat(balParam[1]);
        baseAmt = baseAmt.toFixed(lim[4]);
        let params = inputVal[0] + " " + inputVal[3] + " " + inputVal[2] + " " + baseAmt + " " + strParRef.current.value;
        const res = await BinanceSpotOrder(params);
        if (res == undefined) {console.log('api error')}
        else {
            console.log(res);
        }
      }
    } else {
      console.log("trade section locked pls");
    }
    setIsSending(false);
  }, [isSending, props.pair]);

  const LimitSell = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    priceInput = parseFloat(e.target.value.split(" ")[0] * 1.01)
    let lim = props.pair.split(" ")[5];
    let params = priceInput.toFixed(lim) + " " + e.target.value + " LIMIT " + strParRef.current.value;
    const res = await BinanceSpotLOrder(params);
    if (res == undefined) {console.log('api error')}
    else {
      console.log(res);
    }
    setIsSending(false);
  }, [isSending]);

  const dummyFunc = (e) => {
    console.log(e.target.value);
  }

  const decFuncHigh = (e) => {
    let lim = limitRef.current.value.split(" ");
    let newP = parseFloat(e.target.value) - (parseFloat(lim[1]) * parseFloat(lim[3]));
    setHighPrice(c => c = newP.toFixed(lim[2])); 
  }
  const incFuncHigh = (e) => {
    let lim = limitRef.current.value.split(" ");
    let newP = parseFloat(e.target.value) + (parseFloat(lim[1]) * parseFloat(lim[3]));
    setHighPrice(c => c = newP.toFixed(lim[2])); 
  }
  const decFuncOpen = (e) => {
    let lim = limitRef.current.value.split(" ");
    let newP = parseFloat(e.target.value) - (parseFloat(lim[1]) * parseFloat(lim[3]));
    setOpenPrice(c => c = newP.toFixed(lim[2])); 
  }
  const incFuncOpen = (e) => {
    let lim = limitRef.current.value.split(" ");
    let newP = parseFloat(e.target.value) + (parseFloat(lim[1]) * parseFloat(lim[3]));
    setOpenPrice(c => c = newP.toFixed(lim[2])); 
  }
  const decFuncClose = (e) => {
    let lim = limitRef.current.value.split(" ");
    let newP = parseFloat(e.target.value) - (parseFloat(lim[1]) * parseFloat(lim[3]));
    setClosePrice(c => c = newP.toFixed(lim[2])); 
  }
  const incFuncClose = (e) => {
    let lim = limitRef.current.value.split(" ");
    let newP = parseFloat(e.target.value) + (parseFloat(lim[1]) * parseFloat(lim[3]));
    setClosePrice(c => c = newP.toFixed(lim[2])); 
  }
  const decFuncLow = (e) => {
    let lim = limitRef.current.value.split(" ");
    let newP = parseFloat(e.target.value) - (parseFloat(lim[1]) * parseFloat(lim[3]));
    setLowPrice(c => c = newP.toFixed(lim[2])); 
  }
  const incFuncLow = (e) => {
    let lim = limitRef.current.value.split(" ");
    let newP = parseFloat(e.target.value) + (parseFloat(lim[1]) * parseFloat(lim[3]));
    setLowPrice(c => c = newP.toFixed(lim[2])); 
  }
  const decFuncAvp = (e) => {
    let lim = limitRef.current.value.split(" ");
    let newP = parseFloat(e.target.value) - (parseFloat(lim[1]) * parseFloat(lim[3]));
    setAvPrice(c => c = newP.toFixed(lim[2])); 
  }
  const incFuncAvp = (e) => {
    let lim = limitRef.current.value.split(" ");
    let newP = parseFloat(e.target.value) + (parseFloat(lim[1]) * parseFloat(lim[3]));
    setAvPrice(c => c = newP.toFixed(lim[2])); 
  }
  //next
  const decFuncHighn = (e) => {
    let lim = limitRef.current.value.split(" ");
    let newP = parseFloat(e.target.value) - (parseFloat(lim[1]) * parseFloat(lim[3]));
    setNHighPrice(c => c = newP.toFixed(lim[2])); 
  }
  const incFuncHighn = (e) => {
    let lim = limitRef.current.value.split(" ");
    let newP = parseFloat(e.target.value) + (parseFloat(lim[1]) * parseFloat(lim[3]));
    setNHighPrice(c => c = newP.toFixed(lim[2])); 
  }
  const decFuncOpenn = (e) => {
    let lim = limitRef.current.value.split(" ");
    let newP = parseFloat(e.target.value) - (parseFloat(lim[1]) * parseFloat(lim[3]));
    setNOpenPrice(c => c = newP.toFixed(lim[2])); 
  }
  const incFuncOpenn = (e) => {
    let lim = limitRef.current.value.split(" ");
    let newP = parseFloat(e.target.value) + (parseFloat(lim[1]) * parseFloat(lim[3]));
    setNOpenPrice(c => c = newP.toFixed(lim[2])); 
  }
  const decFuncClosen = (e) => {
    let lim = limitRef.current.value.split(" ");
    let newP = parseFloat(e.target.value) - (parseFloat(lim[1]) * parseFloat(lim[3]));
    setNClosePrice(c => c = newP.toFixed(lim[2])); 
  }
  const incFuncClosen = (e) => {
    let lim = limitRef.current.value.split(" ");
    let newP = parseFloat(e.target.value) + (parseFloat(lim[1]) * parseFloat(lim[3]));
    setNClosePrice(c => c = newP.toFixed(lim[2])); 
  }
  const decFuncLown = (e) => {
    let lim = limitRef.current.value.split(" ");
    let newP = parseFloat(e.target.value) - (parseFloat(lim[1]) * parseFloat(lim[3]));
    setNLowPrice(c => c = newP.toFixed(lim[2])); 
  }
  const incFuncLown = (e) => {
    let lim = limitRef.current.value.split(" ");
    let newP = parseFloat(e.target.value) + (parseFloat(lim[1]) * parseFloat(lim[3]));
    setNLowPrice(c => c = newP.toFixed(lim[2])); 
  }
  const decFuncAvpn = (e) => {
    let lim = limitRef.current.value.split(" ");
    let newP = parseFloat(e.target.value) - (parseFloat(lim[1]) * parseFloat(lim[3]));
    setNAvPrice(c => c = newP.toFixed(lim[2])); 
  }
  const incFuncAvpn = (e) => {
    let lim = limitRef.current.value.split(" ");
    let newP = parseFloat(e.target.value) + (parseFloat(lim[1]) * parseFloat(lim[3]));
    setNAvPrice(c => c = newP.toFixed(lim[2])); 
  }

  const getBal = useCallback(async () => {
    if (isSending) return
    setIsSending(true);
    let res = await GetAccount();
    if (res == undefined) {console.log('api error')}
    else {
      let pairBal = splitter(pair, baseLen);
      let pairArr = pairBal.split(" ");
      let symb = res.balances.filter((x) => x.asset == pairArr[0] || x.asset == pairArr[1]);
      let baseBal = symb.filter(x => x.asset == pairArr[0]); 
      let quoteBal = symb.filter(x => x.asset == pairArr[1]); 
      setCurrentBalance(e => e = quoteBal[0].free + " " + baseBal[0].free + " " + pairBal);
    }
    setIsSending(false);
  }, [isSending]);

  const klineLoader = async () => {
    let temp = props.kline;
    if (temp == null) {} 
    else {
      setOpenPrice(e => e = temp.k.o);
      setHighPrice(e => e = temp.k.h);
      setClosePrice(e => e = temp.k.c);
      setLowPrice(e => e = temp.k.l);
      avR(temp.k);
      let color;
      if (temp.k.o < temp.k.c) {
        color = "GREEN";
      } else {
        color = "RED";
      }
      setLimitSafe(color);
    }
    let next = await JSON.parse(localStorage.getItem("prevKline"));
    if (next == null) {}
    else {
      setNOpenPrice(e => e = next.k.o);
      setNHighPrice(e => e = next.k.h);
      setNClosePrice(e => e = next.k.c);
      setNLowPrice(e => e = next.k.l);
      navR(next.k);
    }
  } 
  const setBal = (e) => {
    setCurrentBalance(x => x = e.target.value);
  }
  const getCurrentOrders = async () => {
    const res = await GetOpenOrderSpot(pair);
    if (res == undefined) {console.log('api error')}
    else if (res.length < 1) {
      console.log('no current orders');
    } else {
      let temp = res.map((e) => {
        return {
          T: e.time,
          i: e.orderId,
          c: e.clientOrderId,
          o: e.type,
          s: e.symbol,
          S: e.side,
          P: e.stopPrice,
          p: e.price,
          X: e.status
        }
      });
      setCurrentOrderProp(temp);
    }
  } 
  const lastCandle = () => {
    let candle = props.batch;
    if (candle == null) {}
    else {
      let lim = limitRef.current.value.split(" ");
      let last = candle.pop();
      let next = candle.pop();
        if (last == undefined) {
          console.log('no candle data received');
        } else { 
          let av = (parseFloat(last[1]) + parseFloat(last[2]) + parseFloat(last[3]) + parseFloat(last[4])) * 0.25;
          setOpenPrice(e => e = last[1]);
          setHighPrice(e => e = last[2]);
          setClosePrice(e => e = last[4]);
          setLowPrice(e => e = last[3]);
          setAvPrice(e => e = av.toFixed(lim[2]));
          let color;
          if (last[1] < last[4]) {
            color = "GREEN";
          } else {
            color = "RED";
          }
          setLimitSafe(color);
      }
      if (next == undefined) {
        console.log('no candle data received');
      } else { 
        let av = (parseFloat(next[1]) + parseFloat(next[2]) + parseFloat(next[3]) + parseFloat(next[4])) * 0.25;
        setNOpenPrice(e => e = next[1]);
        setNHighPrice(e => e = next[2]);
        setNClosePrice(e => e = next[4]);
        setNLowPrice(e => e = next[3]);
        setNAvPrice(e => e = av.toFixed(lim[2]));
    }
    }
  }

  const closeLoader = async () => {
    const update = props.order;
    if ( update == null ) {} 
    else {
      if (update.X == "FILLED" && update.S == "BUY" ) {
        let boxVal = longPositionRef.current.value;
        if (boxVal.length < 1) {
          setLongPosition(e => e = update.p + " " + update.q + " " + update.s);
        } else {
          let stateQty = boxVal.split(" ")[1];
          let newQty = parseFloat(stateQty) + parseFloat(update.q);
          setLongPosition(e => e = update.p + " " + newQty + " " + update.s);
        } 
        setShortPosition(e => e = "");
      }
      else if (update.X == "FILLED" && update.S == "SELL" ) {
        let boxVal = shortPositionRef.current.value;
        if (boxVal.length < 1) {
          setShortPosition(e => e = update.p + " " + update.q + " " + update.s);
        } else {
          let stateQty = boxVal.split(" ")[1];
          let newQty = parseFloat(stateQty) + parseFloat(update.q);
          setShortPosition(e => e = update.p + " " + newQty + " " + update.s);
        } 
        setLongPosition(e => e = "");
      }
      else if (update.X == "TRADED" && update.S == "BUY" ) {
        let boxVal = longPositionRef.current.value;
        //let diff = parseFloat(update.q) - parseFloat(update.z);
        //if ((parseFloat(update.q) - parseFloat(update.z)) == 0) {}
        if (boxVal.length < 1) {
          setLongPosition(e => e = update.p + " " + update.q + " " + update.s);
        } else {
          let stateQty = boxVal.split(" ")[1];
          let newQty = parseFloat(stateQty) - parseFloat(update.l);
          setLongPosition(e => e = update.p + " " + newQty + " " + update.s);
        }
      }
      else if (update.X == "TRADED" && update.S == "SELL" ) {
        let boxVal = shortPositionRef.current.value;
        if (boxVal.length < 1) {
          setShortPosition(e => e = update.p + " " + update.q + " " + update.s );
        } else {
          let stateQty = boxVal.split(" ")[1];
          let newQty = parseFloat(stateQty) - parseFloat(update.l);
          setShortPosition(e => e = update.p + " " + newQty + " " + update.s);
        }
      }
      else {
        console.log(update);
      }
    }
  }
 
  useEffect(() => {
    klineLoader();
    return (() => {
      localStorage.setItem("prevKline", JSON.stringify(props.kline));
      }
    )
  }, [props.kline]);
  
  useEffect(() => {
    closeLoader();
  }, [props.order]);

  useEffect(() => {
    lastCandle();
  }, [props.batch]);

  return (
    <div className='tradeSection'>
      <div className='tradeCategory'>
        <div className='inputGroup'>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={highPrice ? highPrice + " BUY LIMIT " + pair : ""} onClick={dummyFunc}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={highPrice ? highPrice + " SELL LIMIT " + pair : ""} onClick={dummyFunc}>S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={highPrice ? highPrice + " SELL LIMIT " + pair : ""} onClick={dummyFunc}>l</button>
            <button className='tradeButton' type="button" disabled={isSending} value={highPrice ? highPrice + " BUY LIMIT " + pair : ""} onClick={dummyFunc}>s</button>
          </div>  
          <div className='tradeFlex'>
            <button className='incButton' type="button" onClick={decFuncHigh} value={highPrice ? highPrice : ""}>-</button>
            <input className="tradeInput" type="text" onChange={(e) => setHighPrice(e.target.value)} value={highPrice ? highPrice : ""} />
            <button className='incButton' type="button" onClick={incFuncHigh} value={highPrice ? highPrice : ""}>+</button>
          </div>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={highPrice ? highPrice + " BUY STOP_LOSS_LIMIT " + pair : ""} onClick={StopOrder}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={highPrice ? highPrice + " SELL STOP_LOSS_LIMIT " + pair : ""} onClick={StopOrder}>S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={highPrice ? highPrice + " SELL STOP_LOSS_LIMIT " + pair : ""} onClick={dummyFunc}>l</button>
            <button className='tradeButton' type="button" disabled={isSending} value={highPrice ? highPrice + " BUY STOP_LOSS_LIMIT " + pair : ""} onClick={dummyFunc}>s</button>
          </div>  
          <div className='candleLabel'>HIGH</div>
        </div>
        <div className='inputGroup'>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={openPrice ? openPrice + " BUY LIMIT " + pair : ""} onClick={dummyFunc}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={openPrice ? openPrice + " SELL LIMIT " + pair : ""} onClick={dummyFunc}>S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={openPrice ? openPrice + " SELL LIMIT " + pair : ""} onClick={dummyFunc}>l</button>
            <button className='tradeButton' type="button" disabled={isSending} value={openPrice ? openPrice + " BUY LIMIT " + pair : ""} onClick={dummyFunc}>s</button>
          </div>
          <div className='tradeFlex'>
            <button className='incButton' type="button" onClick={decFuncOpen} value={openPrice ? openPrice : ""}>-</button>
            <input className="tradeInput" type="text" onChange={(e) => setOpenPrice(e.target.value)} value={openPrice ? openPrice : ""} />
            <button className='incButton' type="button" onClick={incFuncOpen} value={openPrice ? openPrice : ""}>+</button>
          </div>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={openPrice ? openPrice + " BUY STOP_LOSS_LIMIT " + pair : ""} onClick={StopOrder}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={openPrice ? openPrice + " SELL STOP_LOSS_LIMIT " + pair : ""} onClick={StopOrder}>S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={openPrice ? openPrice + " SELL STOP_LOSS_LIMIT " + pair : ""} onClick={dummyFunc}>l</button>
            <button className='tradeButton' type="button" disabled={isSending} value={openPrice ? openPrice + " BUY STOP_LOSS_LIMIT " + pair : ""} onClick={dummyFunc}>s</button>
          </div> 
          <div className='candleLabel'>OPEN</div>
        </div>
        <div className='inputGroup'>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={closePrice ? closePrice + " BUY LIMIT " + pair : ""} onClick={dummyFunc}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={closePrice ? closePrice + " SELL LIMIT " + pair : ""} onClick={dummyFunc}>S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={closePrice ? closePrice + " SELL LIMIT " + pair : ""} onClick={dummyFunc}>l</button>
            <button className='tradeButton' type="button" disabled={isSending} value={closePrice ? closePrice + " BUY LIMIT " + pair : ""} onClick={dummyFunc}>s</button>
          </div>
          <div className='tradeFlex'>
            <button className='incButton' type="button" onClick={decFuncClose} value={closePrice ? closePrice : ""}>-</button>
            <input className="tradeInput" type="text" onChange={(e) => setClosePrice(e.target.value)} value={closePrice ? closePrice : ""} />
            <button className='incButton' type="button" onClick={incFuncClose} value={closePrice ? closePrice : ""}>+</button>
          </div>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={closePrice ? closePrice + " BUY STOP_LOSS_LIMIT " + pair : ""} onClick={StopOrder}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={closePrice ? closePrice + " SELL STOP_LOSS_LIMIT " + pair : ""} onClick={StopOrder}>S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={closePrice ? closePrice + " SELL STOP_LOSS_LIMIT " + pair : ""} onClick={dummyFunc}>l</button>
            <button className='tradeButton' type="button" disabled={isSending} value={closePrice ? closePrice + " BUY STOP_LOSS_LIMIT " + pair : ""} onClick={dummyFunc}>s</button>
          </div>
          <div className='candleLabel'>CLOSE</div>
        </div>
        <div className='inputGroup'>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={lowPrice ? lowPrice + " BUY LIMIT " + pair : ""} onClick={dummyFunc}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={lowPrice ? lowPrice + " SELL LIMIT " + pair : ""} onClick={dummyFunc}> S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={lowPrice ? lowPrice + " SELL LIMIT " + pair : ""} onClick={dummyFunc}> l </button>
            <button className='tradeButton' type="button" disabled={isSending} value={lowPrice ? lowPrice + " BUY LIMIT " + pair : ""} onClick={dummyFunc}> s </button>
          </div>
          <div className='tradeFlex'>
            <button className='incButton' type="button" onClick={decFuncLow} value={lowPrice ? lowPrice : ""}>-</button>
            <input className="tradeInput" type="text"  onChange={(e) => setLowPrice(e.target.value)} value={lowPrice ? lowPrice : ""} />
            <button className='incButton' type="button" onClick={incFuncLow} value={lowPrice ? lowPrice : ""}>+</button>
          </div>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={lowPrice ? lowPrice + " BUY STOP_LOSS_LIMIT " + pair : ""} onClick={StopOrder}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={lowPrice ? lowPrice + " SELL STOP_LOSS_LIMIT " + pair : ""} onClick={StopOrder}> S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={lowPrice ? lowPrice + " SELL STOP_LOSS_LIMIT " + pair : ""} onClick={dummyFunc}> l </button>
            <button className='tradeButton' type="button" disabled={isSending} value={lowPrice ? lowPrice + " BUY STOP_LOSS_LIMIT " + pair : ""} onClick={dummyFunc}> s </button>
          </div>
          <div className='candleLabel'>LOW</div>
        </div>
        <div className='inputGroup'>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={avPrice ? avPrice + " BUY LIMIT " + pair : ""} onClick={dummyFunc}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={avPrice ? avPrice + " SELL LIMIT " + pair : ""} onClick={dummyFunc}> S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={avPrice ? avPrice + " SELL LIMIT " + pair : ""} onClick={dummyFunc}> l </button>
            <button className='tradeButton' type="button" disabled={isSending} value={avPrice ? avPrice + " BUY LIMIT " + pair : ""} onClick={dummyFunc}> s </button>
          </div>
          <div className='tradeFlex'>
            <button className='incButton' type="button" onClick={decFuncAvp} value={avPrice ? avPrice : ""}>-</button>
            <input className="tradeInput" type="text"  onChange={(e) => setAvPrice(e.target.value)} value={avPrice ? avPrice : ""} />
            <button className='incButton' type="button" onClick={incFuncAvp} value={avPrice ? avPrice : ""}>+</button>
          </div>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={avPrice ? avPrice + " BUY STOP_LOSS_LIMIT " + pair : ""} onClick={StopOrder}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={avPrice ? avPrice + " SELL STOP_LOSS_LIMIT " + pair : ""} onClick={StopOrder}> S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={avPrice ? avPrice + " SELL STOP_LOSS_LIMIT " + pair : ""} onClick={dummyFunc}> l </button>
            <button className='tradeButton' type="button" disabled={isSending} value={avPrice ? avPrice + " BUY STOP_LOSS_LIMIT " + pair : ""} onClick={dummyFunc}> s </button>
          </div>
          <div className='candleLabel'>AVERAGE</div>
        </div>
        <div className='inputGroup'>
          <div className='balFlex'>
            <select className='strInput' onChange={(e) => setStrPar(e.target.value)}> 
              <option value="">o</option>
              <option value="GTC FALSE">GTC</option>
              <option value="IOC FALSE">IOC</option>
              <option value="FOK FALSE">FOK</option>
            </select>
            <input ref={strParRef} className="balInput" type="text" onChange={(e) => setStrPar(e.target.value)} value={strPar ? strPar : ""} />
          </div>
          <div className='balFlex'>
            <button className='balButton' disabled={isSending}  value={longPositionRef.current.value + " SELL " + pair} onClick={MarketSell}>MS</button>
            <input ref={longPositionRef} className="balInput" type="text" onChange={(e) => setLongPosition(e.target.value)} value={longPosition ? longPosition : ""} />
          </div>
          <div className='balFlex'>
            <button className="balButton" disabled={isSending}  value={shortPositionRef.current.value + " " + pair} onClick={LimitSell}>LS</button>
            <input ref={shortPositionRef} className="balInput" type="text" onChange={(e) => setShortPosition(e.target.value)} value={shortPosition ? shortPosition : ""} />
          </div>
        </div>
      </div>
      <div className='tradeCategory'>
        <div className='inputGroup'>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={nHighPrice ? nHighPrice + " BUY LIMIT " + pair : ""} onClick={dummyFunc}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nHighPrice ? nHighPrice + " SELL LIMIT " + pair : ""} onClick={dummyFunc}> S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nHighPrice ? nHighPrice + " SELL LIMIT " + pair : ""} onClick={dummyFunc}> l </button>
            <button className='tradeButton' type="button" disabled={isSending} value={nHighPrice ? nHighPrice + " BUY LIMIT " + pair : ""} onClick={dummyFunc}> s </button>
          </div> 
          <div className='tradeFlex'>
            <button className='incButton' type="button" value={nHighPrice ? nHighPrice : ""} onClick={decFuncHighn}>-</button>
            <input className="tradeInput" type="text" onChange={(e) => setNHighPrice(e.target.value)} value={nHighPrice ? nHighPrice : ""} />
            <button className='incButton' type="button" value={nHighPrice ? nHighPrice : ""} onClick={incFuncHighn}>+</button>
          </div>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={nHighPrice ? nHighPrice + " BUY STOP_LOSS_LIMIT " + pair : ""} onClick={StopOrder}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nHighPrice ? nHighPrice + " SELL STOP_LOSS_LIMIT " + pair : ""} onClick={StopOrder}> S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nHighPrice ? nHighPrice + " SELL STOP_LOSS_LIMIT " + pair : ""} onClick={dummyFunc}> l </button>
            <button className='tradeButton' type="button" disabled={isSending} value={nHighPrice ? nHighPrice + " BUY STOP_LOSS_LIMIT " + pair : ""} onClick={dummyFunc}> s </button>
          </div>  
        </div>
        <div className='inputGroup'>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={nOpenPrice ? nOpenPrice + " BUY LIMIT " + pair : ""} onClick={dummyFunc}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nOpenPrice ? nOpenPrice + " SELL LIMIT " + pair : ""} onClick={dummyFunc}>S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nOpenPrice ? nOpenPrice + " SELL LIMIT " + pair : ""} onClick={dummyFunc}>l</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nOpenPrice ? nOpenPrice + " BUY LIMIT " + pair : ""} onClick={dummyFunc}>s</button>
          </div>
          <div className='tradeFlex'>
            <button className='incButton' type="button" value={nOpenPrice ? nOpenPrice : ""} onClick={decFuncOpenn}>-</button>
            <input className="tradeInput" type="text" onChange={(e) => setNOpenPrice(e.target.value)} value={nOpenPrice ? nOpenPrice : ""} />
            <button className='incButton' type="button" value={nOpenPrice ? nOpenPrice : ""} onClick={incFuncOpenn}>+</button>
          </div>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={nOpenPrice ? nOpenPrice + " BUY STOP_LOSS_LIMIT " + pair : ""} onClick={StopOrder}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nOpenPrice ? nOpenPrice + " SELL STOP_LOSS_LIMIT " + pair : ""} onClick={StopOrder}>S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nOpenPrice ? nOpenPrice + " SELL STOP_LOSS_LIMIT " + pair : ""} onClick={dummyFunc}>l</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nOpenPrice ? nOpenPrice + " BUY STOP_LOSS_LIMIT " + pair : ""} onClick={dummyFunc}>s</button>
          </div>
        </div>
        <div className='inputGroup'>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={nClosePrice ? nClosePrice + " BUY LIMIT " + pair : ""} onClick={dummyFunc}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nClosePrice ? nClosePrice + " SELL LIMIT " + pair : ""} onClick={dummyFunc}>S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nClosePrice ? nClosePrice + " SELL LIMIT " + pair : ""} onClick={dummyFunc}>l</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nClosePrice ? nClosePrice + " BUY LIMIT " + pair : ""} onClick={dummyFunc}>s</button>
          </div>
          <div className='tradeFlex'>
            <button className='incButton' type="button" value={nClosePrice ? nClosePrice : ""} onClick={decFuncClosen}>-</button>
            <input className="tradeInput" type="text" onChange={(e) => setNClosePrice(e.target.value)} value={nClosePrice ? nClosePrice : ""} />
            <button className='incButton' type="button" value={nClosePrice ? nClosePrice : ""} onClick={incFuncClosen}>+</button>
          </div>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={nClosePrice ? nClosePrice + " BUY STOP_LOSS_LIMIT " + pair : ""} onClick={StopOrder}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nClosePrice ? nClosePrice + " SELL STOP_LOSS_LIMIT " + pair : ""} onClick={StopOrder}>S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nClosePrice ? nClosePrice + " SELL STOP_LOSS_LIMIT " + pair : ""} onClick={dummyFunc}>l</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nClosePrice ? nClosePrice + " BUY STOP_LOSS_LIMIT " + pair : ""} onClick={dummyFunc}>s</button>
          </div>
        </div>
        <div className='inputGroup'>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={nLowPrice ? nLowPrice + " BUY LIMIT " + pair : ""} onClick={dummyFunc}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nLowPrice ? nLowPrice + " SELL LIMIT " + pair : ""} onClick={dummyFunc}> S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nLowPrice ? nLowPrice + " SELL LIMIT " + pair : ""} onClick={dummyFunc}> l </button>
            <button className='tradeButton' type="button" disabled={isSending} value={nLowPrice ? nLowPrice + " BUY LIMIT " + pair : ""} onClick={dummyFunc}> s </button>
          </div>
          <div className='tradeFlex'>
            <button className='incButton' type="button" value={nLowPrice ? nLowPrice : ""} onClick={decFuncLown}>-</button>
            <input className="tradeInput" type="text"  onChange={(e) => setNLowPrice(e.target.value)} value={nLowPrice ? nLowPrice : ""} />
            <button className='incButton' type="button" value={nLowPrice ? nLowPrice : ""} onClick={incFuncLown}>+</button>
          </div>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={nLowPrice ? nLowPrice + " BUY STOP_LOSS_LIMIT " + pair : ""} onClick={StopOrder}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nLowPrice ? nLowPrice + " SELL STOP_LOSS_LIMIT " + pair : ""} onClick={StopOrder}> S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nLowPrice ? nLowPrice + " SELL STOP_LOSS_LIMIT " + pair : ""} onClick={dummyFunc}> l </button>
            <button className='tradeButton' type="button" disabled={isSending} value={nLowPrice ? nLowPrice + " BUY STOP_LOSS_LIMIT " + pair : ""} onClick={dummyFunc}> s </button>
          </div>
        </div>
        <div className='inputGroup'>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={nAvPrice ? nAvPrice + " BUY LIMIT " + pair : ""} onClick={dummyFunc}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nAvPrice ? nAvPrice + " SELL LIMIT " + pair : ""} onClick={dummyFunc}> S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nAvPrice ? nAvPrice + " SELL LIMIT " + pair : ""} onClick={dummyFunc}> l </button>
            <button className='tradeButton' type="button" disabled={isSending} value={nAvPrice ? nAvPrice + " BUY LIMIT " + pair : ""} onClick={dummyFunc}> s </button>
          </div>
          <div className='tradeFlex'>
            <button className='incButton' type="button" value={nAvPrice ? nAvPrice : ""} onClick={decFuncAvpn}>-</button>
            <input className="tradeInput" type="text"  onChange={(e) => setNAvPrice(e.target.value)} value={nAvPrice ? nAvPrice : ""} />
            <button className='incButton' type="button" value={nAvPrice ? nAvPrice : ""} onClick={incFuncAvpn}>+</button>
          </div>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={nAvPrice ? nAvPrice + " BUY STOP_LOSS_LIMIT " + pair : ""} onClick={StopOrder}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nAvPrice ? nAvPrice + " SELL STOP_LOSS_LIMIT " + pair : ""} onClick={StopOrder}> S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nAvPrice ? nAvPrice + " SELL STOP_LOSS_LIMIT " + pair : ""} onClick={dummyFunc}> l </button>
            <button className='tradeButton' type="button" disabled={isSending} value={nAvPrice ? nAvPrice + " BUY STOP_LOSS_LIMIT " + pair : ""} onClick={dummyFunc}> s </button>
          </div>
        </div>
        <div className='inputGroup'>
          <input ref={limitRef} className="tradeInputt" type="text" onChange={(e) => setLimit(e.target.value)} value={limit ? limit : ""} />
          <div className='balFlex'>
            <button className='balButton' disabled={isSending} value={pair} onClick={getCurrentOrders}>O</button>
            <input className="balInput" type="text" />
          </div>
          <div className='balFlex'>
            <button className="balButton" disabled={isSending} onClick={getBal} >B</button>
            <input ref={currentBalanceRef} className="balInput" type="text" onChange={setBal} value={currentBalance ? currentBalance : ""} />
          </div>
        </div>
     </div>
     <OrderSpot order={props.order} currentOrder={currentOrderProp} /> 
    </div>
  );
});
export default TradeSpot;
