import React, { useState, useEffect, useCallback, useRef } from "react";
import BinanceFOrder from '../lib/BinanceFOrder';
import BinanceTOrder from '../lib/BinanceTOrder';
import BinanceLOrder from '../lib/BinanceLOrder';
import GetAccountBalance from '../lib/GetAccountBalance';
import GetPosition from '../lib/GetPosition';
import GetOpenOrders from '../lib/GetOpenOrders';
import Order from './Order';
import Position from "./Position";
import './Trade.css'; 

const Trade = React.memo((props) => {
  const extract = () => {
    let target = props.pair.split(" ").splice(4, 5);
    return target.join(" ");
  }
  const extractt = () => {
    let target = props.pair.split(" ").splice(12, 2);
    return target.join(" ");
  }
  const extracttt = () => {
    let target = props.pair.split(" ").splice(0, 1);
    return target[0];
  }
  const [currentOrderProp, setCurrentOrderProp] = useState(null);
  const [orderPair, setOrderPair] = useState(extracttt());
  const [Qty, setQty] = useState(null);
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
  const [currentBalance, setCurrentBalance] = useState("USDT 200 1 0.5");
  const currentBalanceRef = useRef("");
  const [isSending, setIsSending] = useState(false);
  const [longPosition, setLongPosition] = useState("");
  const [limitSafe, setLimitSafe] = useState("");
  const [shortPosition, setShortPosition] = useState("");
  const [strPar, setStrPar] = useState(extractt());
  const longPositionRef = useRef("");
  const shortPositionRef = useRef("");
  const orderPairRef = useRef("");
  const strParRef = useRef("");
  const pair = props.pair.split(" ")[0].toUpperCase();

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
  const OpenLimit = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let lim = limitRef.current.value.split(" ");
    let safety = props.pair.split(" ").pop();
    let ls = e.target.value.split(" ");
    let limSafe = (ls[2] == "SHORT" && ls[5] == "RED") || (ls[2] == "LONG" && ls[5] == "GREEN");
    if (safety == "true" && limSafe == true) {
      setIsSending(true);
      let balParam = currentBalanceRef.current.value.split(" ");
      if (balParam.length < 2) {console.log('get current balance pls')}
      else {
        let qty = (parseFloat(balParam[1]) * parseFloat(balParam[2]) * parseFloat(balParam[3])) / parseFloat(ls[0]);
        qty = qty.toFixed(lim[4]);
        let discard = ls.pop();
        let params = ls.join(" ") + " " + qty + " " + strParRef.current.value;
        const res = await BinanceLOrder(params);
        if (res == undefined) {console.log('api error')}
        else {
          console.log(res);
        }
      }
    } else {
      console.log("trade section locked pls");
    }
    setIsSending(false);
  }, [isSending]);

  const CloseLimit = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let lim = limitRef.current.value.split(" ");
    let ls = e.target.value.split(" ");
    let discard = ls.pop();
    let grab;
    if (ls[2] == 'LONG') {
      grab = longPositionRef.current.value.split(" ");
    } else {
      grab = shortPositionRef.current.value.split(" ");
    }
    if (grab.length < 2) {console.log('get current position pls')}
    else {
      let qty = Math.abs(grab[1]);
      qty = qty.toFixed(lim[4]);
      let params = ls.join(" ") + " " + qty + " " + strParRef.current.value;
      const res = await BinanceLOrder(params);
      if (res == undefined) {console.log('api error')}
      else {
        console.log(res);
      }
    }
    setIsSending(false);
  }, [isSending]);

  const OpenStop = useCallback(async (e) => {
    if (isSending) return
    let lim = limitRef.current.value.split(" ");
    let safety = props.pair.split(" ").pop();
    if (safety == "true") {
      setIsSending(true);
      let buttonVal = e.target.value;
      let limPrice;
      let checker = e.target.value.split(" ")[2];
      if (checker == 'LONG') {
        limPrice = parseFloat(buttonVal.split(" ")[0]) + (parseFloat(lim[0]) * parseFloat(lim[3]));
      } else {
        limPrice = parseFloat(buttonVal.split(" ")[0]) - (parseFloat(lim[0]) * parseFloat(lim[3]));
      }
      let balParam = currentBalanceRef.current.value.split(" ");
      if (balParam.length < 2) {console.log('get current balance pls')}
      else {
        let qty = (parseFloat(balParam[1]) * parseFloat(balParam[2]) * parseFloat(balParam[3])) / limPrice;
        qty = qty.toFixed(lim[4]);
        let params = buttonVal + " " + limPrice.toFixed(lim[2]) + " " + qty + " " + strParRef.current.value;
        const res = await BinanceFOrder(params);
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

  const CloseStop = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let buttonVal = e.target.value;
    let lim = limitRef.current.value.split(" ");
    let limPrice;
    let grab;
    let limChecker = e.target.value.split(" ")[2];
    let grabChecker = buttonVal.split(" ")[2];
    if (limChecker == 'LONG') {
      limPrice = parseFloat(buttonVal.split(" ")[0]) + (parseFloat(lim[0]) * parseFloat(lim[3]));
      } else {
        limPrice = parseFloat(buttonVal.split(" ")[0]) - (parseFloat(lim[0]) * parseFloat(lim[3]));
      }
    if (grabChecker == 'LONG') {
      grab = longPositionRef.current.value.split(" ");
    } else {
      grab = shortPositionRef.current.value.split(" ");
    }
    if (grab.length < 2) {console.log('get current position pls')}
    else {
      let qty = Math.abs(grab[1]);
      let params = buttonVal + " " + limPrice.toFixed(lim[2]) + " " + qty + " " + strParRef.current.value;
      const res = await BinanceFOrder(params);
      if (res == undefined) {console.log('api error')}
      else {
        console.log(res);
      }
    }
    setIsSending(false);
  }, [isSending]); 

  const MarketClose = useCallback(async (e) => {
    if (isSending) return
    let safety = props.pair.split(" ").pop();
    if (safety == "true") {
      setIsSending(true);
      let inputVal = e.target.value.split(" ");
      if (inputVal.length < 5) {console.log('no position now')}
      else {
        let params = inputVal[0] + " " + inputVal[4] + " " + inputVal[5] + " " + inputVal[6] + " " + inputVal[1] + " " + strParRef.current.value;
        const res = await BinanceTOrder(params);
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
    let res = await GetAccountBalance();
    if (res == undefined) {console.log('api error')}
    else {
      let symb = res.filter((x) => x.asset == "USDT");
      console.log(symb);
      setCurrentBalance(e => e = symb[0].asset + " " + symb[0].balance + " " + "1" + " " + "0.5")
    }
    setIsSending(false);
  }, [isSending]);
  const getPos = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let buttonParam = e.target.value;
    let poInfo = await GetPosition(buttonParam);
    if (poInfo == undefined) {console.log('api error')}
    else {
      let target = poInfo.positions.filter((x) => x.positionAmt != 0);
      if (target.length < 1) {
        console.log('no current posit');
      }
      else if (target.length > 0){
        let temp = target.map((e) => {
          return {
            s: e.symbol,
            ps: e.positionSide,
            pa: e.positionAmt,
            ep: e.entryPrice,
            cr: e.unrealizedProfit,
            up: e.unrealizedProfit,
          }
        });
        setQty(temp);
        console.log(temp);
      }
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
    console.log(currentBalance);
  }
  const getCurrentOrders = useCallback(async () => {
    if (isSending) return
    setIsSending(true);
    let orderParam = orderPairRef.current.value.toUpperCase()
    const res = await GetOpenOrders(orderParam);
    if (res == undefined) {console.log('api error')}
    else {
      if (res.length < 1) {
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
            ps: e.positionSide,
            sp: e.stopPrice,
            p: e.price,
            X: e.status
          }
        });
        setCurrentOrderProp(temp);
      }
    }
    setIsSending(false);
  }, [isSending]);

  const lastCandle = () => {
    if (props.batch == null) {}
    else {
      let propCan = [...props.batch];
      let last = propCan.pop();
      let next = propCan.pop();
      let lim = limitRef.current.value.split(" ");
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
      if (update.X == "FILLED" && update.ps == "LONG" && update.S == "BUY" ) {
        let boxVal = longPositionRef.current.value;
        if (boxVal.length < 1) {
          setLongPosition(e => e = update.p + " " + update.q + " " + update.s + " " + update.ps);
        } else {
          let stateQty = boxVal.split(" ")[1];
          let newQty = parseFloat(stateQty) + parseFloat(update.q);
          setLongPosition(e => e = update.p + " " + newQty + " " + update.s + " " + update.ps);
        }
      }
      else if (update.X == "FILLED" && update.ps == "SHORT" && update.S == "SELL" ) {
        let boxVal = shortPositionRef.current.value;
        if (boxVal.length < 1) {
          setShortPosition(e => e = update.p + " " + update.q + " " + update.s + " " + update.ps);
        } else {
          let stateQty = boxVal.split(" ")[1];
          let newQty = parseFloat(stateQty) + parseFloat(update.q);
          setShortPosition(e => e = update.p + " " + newQty + " " + update.s + " " + update.ps);
        }
      }
      else if (update.X == "PARTIALLY_FILLED" && update.ps == "LONG" && update.S == "BUY" ) {
        let boxVal = longPositionRef.current.value;
        if (boxVal.length < 1) {
          setLongPosition(e => e = update.p + " " + update.q + " " + update.s + " " + update.ps);
        } else {
          let stateQty = boxVal.split(" ")[1];
          let newQty = parseFloat(stateQty) + parseFloat(update.l);
          setLongPosition(e => e = update.p + " " + newQty + " " + update.s + " " + update.ps)
        }
      }
      else if (update.X == "PARTIALLY_FILLED" && update.ps == "SHORT" && update.S == "SELL" ) {
        let boxVal = shortPositionRef.current.value;
        if (boxVal.length < 1) {
          setShortPosition(e => e = update.p + " " + update.q + " " + update.s + " " + update.ps);
        } else {
          let stateQty = boxVal.split(" ")[1];
          let newQty = parseFloat(stateQty) + parseFloat(update.l);
          setShortPosition(e => e = update.p + " " + newQty + " " + update.s + " " + update.ps);
        }
      }
      else if (update.X == "FILLED" && update.ps == "SHORT" && update.S == "BUY" ) {
        setShortPosition(e => e = "");
      }
      else if (update.X == "FILLED" && update.ps == "LONG" && update.S == "SELL" ) {
        setLongPosition(e => e = "");
      }
      else if (update.X == "PARTIALLY_FILLED" && update.ps == "LONG" && update.S == "SELL" ) {
        let newQty = parseFloat(update.q) - parseFloat(update.z);
        setLongPosition(e => e = update.p + " " + newQty + " " + update.s + " " + update.ps);
      }
      else if (update.X == "PARTIALLY_FILLED" && update.ps == "SHORT" && update.S == "BUY" ) {
        let newQty = parseFloat(update.q) - parseFloat(update.z);
        setLongPosition(e => e = update.p + " " + newQty + " " + update.s + " " + update.ps);
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
            <button className='tradeButton' type="button" disabled={isSending} value={highPrice ? highPrice + " BUY LONG LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={highPrice ? highPrice + " SELL SHORT LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}>S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={highPrice ? highPrice + " SELL LONG LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}>l</button>
            <button className='tradeButton' type="button" disabled={isSending} value={highPrice ? highPrice + " BUY SHORT LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}>s</button>
          </div>  
          <div className='tradeFlex'>
            <button className='incButton' type="button" onClick={decFuncHigh} value={highPrice ? highPrice : ""}>-</button>
            <input className="tradeInput" type="text" onChange={(e) => setHighPrice(e.target.value)} value={highPrice ? highPrice : ""} />
            <button className='incButton' type="button" onClick={incFuncHigh} value={highPrice ? highPrice : ""}>+</button>
          </div>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={highPrice ? highPrice + " BUY LONG STOP " + pair : ""} onClick={OpenStop}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={highPrice ? highPrice + " SELL SHORT STOP " + pair : ""} onClick={OpenStop}>S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={highPrice ? highPrice + " SELL LONG STOP " + pair : ""} onClick={CloseStop}>l</button>
            <button className='tradeButton' type="button" disabled={isSending} value={highPrice ? highPrice + " BUY SHORT STOP " + pair : ""} onClick={CloseStop}>s</button>
          </div>  
          <div className='candleLabel'>HIGH</div>
        </div>
        <div className='inputGroup'>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={openPrice ? openPrice + " BUY LONG LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={openPrice ? openPrice + " SELL SHORT LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}>S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={openPrice ? openPrice + " SELL LONG LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}>l</button>
            <button className='tradeButton' type="button" disabled={isSending} value={openPrice ? openPrice + " BUY SHORT LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}>s</button>
          </div>
          <div className='tradeFlex'>
            <button className='incButton' type="button" onClick={decFuncOpen} value={openPrice ? openPrice : ""}>-</button>
            <input className="tradeInput" type="text" onChange={(e) => setOpenPrice(e.target.value)} value={openPrice ? openPrice : ""} />
            <button className='incButton' type="button" onClick={incFuncOpen} value={openPrice ? openPrice : ""}>+</button>
          </div>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={openPrice ? openPrice + " BUY LONG STOP " + pair : ""} onClick={OpenStop}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={openPrice ? openPrice + " SELL SHORT STOP " + pair : ""} onClick={OpenStop}>S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={openPrice ? openPrice + " SELL LONG STOP " + pair : ""} onClick={CloseStop}>l</button>
            <button className='tradeButton' type="button" disabled={isSending} value={openPrice ? openPrice + " BUY SHORT STOP " + pair : ""} onClick={CloseStop}>s</button>
          </div> 
          <div className='candleLabel'>OPEN</div>
        </div>
        <div className='inputGroup'>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={closePrice ? closePrice + " BUY LONG LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={closePrice ? closePrice + " SELL SHORT LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}>S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={closePrice ? closePrice + " SELL LONG LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}>l</button>
            <button className='tradeButton' type="button" disabled={isSending} value={closePrice ? closePrice + " BUY SHORT LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}>s</button>
          </div>
          <div className='tradeFlex'>
            <button className='incButton' type="button" onClick={decFuncClose} value={closePrice ? closePrice : ""}>-</button>
            <input className="tradeInput" type="text" onChange={(e) => setClosePrice(e.target.value)} value={closePrice ? closePrice : ""} />
            <button className='incButton' type="button" onClick={incFuncClose} value={closePrice ? closePrice : ""}>+</button>
          </div>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={closePrice ? closePrice + " BUY LONG STOP " + pair : ""} onClick={OpenStop}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={closePrice ? closePrice + " SELL SHORT STOP " + pair : ""} onClick={OpenStop}>S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={closePrice ? closePrice + " SELL LONG STOP " + pair : ""} onClick={CloseStop}>l</button>
            <button className='tradeButton' type="button" disabled={isSending} value={closePrice ? closePrice + " BUY SHORT STOP " + pair : ""} onClick={CloseStop}>s</button>
          </div>
          <div className='candleLabel'>CLOSE</div>
        </div>
        <div className='inputGroup'>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={lowPrice ? lowPrice + " BUY LONG LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={lowPrice ? lowPrice + " SELL SHORT LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}> S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={lowPrice ? lowPrice + " SELL LONG LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}> l </button>
            <button className='tradeButton' type="button" disabled={isSending} value={lowPrice ? lowPrice + " BUY SHORT LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}> s </button>
          </div>
          <div className='tradeFlex'>
            <button className='incButton' type="button" onClick={decFuncLow} value={lowPrice ? lowPrice : ""}>-</button>
            <input className="tradeInput" type="text"  onChange={(e) => setLowPrice(e.target.value)} value={lowPrice ? lowPrice : ""} />
            <button className='incButton' type="button" onClick={incFuncLow} value={lowPrice ? lowPrice : ""}>+</button>
          </div>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={lowPrice ? lowPrice + " BUY LONG STOP " + pair : ""} onClick={OpenStop}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={lowPrice ? lowPrice + " SELL SHORT STOP " + pair : ""} onClick={OpenStop}> S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={lowPrice ? lowPrice + " SELL LONG STOP " + pair : ""} onClick={CloseStop}> l </button>
            <button className='tradeButton' type="button" disabled={isSending} value={lowPrice ? lowPrice + " BUY SHORT STOP " + pair : ""} onClick={CloseStop}> s </button>
          </div>
          <div className='candleLabel'>LOW</div>
        </div>
        <div className='inputGroup'>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={avPrice ? avPrice + " BUY LONG LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={avPrice ? avPrice + " SELL SHORT LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}> S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={avPrice ? avPrice + " SELL LONG LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}> l </button>
            <button className='tradeButton' type="button" disabled={isSending} value={avPrice ? avPrice + " BUY SHORT LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}> s </button>
          </div> 
          <div className='tradeFlex'>
            <button className='incButton' type="button" onClick={decFuncAvp} value={avPrice ? avPrice : ""}>-</button>
            <input className="tradeInput" type="text"  onChange={(e) => setAvPrice(e.target.value)} value={avPrice ? avPrice : ""} />
            <button className='incButton' type="button" onClick={incFuncAvp} value={avPrice ? avPrice : ""}>+</button>
          </div>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={avPrice ? avPrice + " BUY LONG STOP " + pair : ""} onClick={OpenStop}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={avPrice ? avPrice + " SELL SHORT STOP " + pair : ""} onClick={OpenStop}> S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={avPrice ? avPrice + " SELL LONG STOP " + pair : ""} onClick={CloseStop}> l </button>
            <button className='tradeButton' type="button" disabled={isSending} value={avPrice ? avPrice + " BUY SHORT STOP " + pair : ""} onClick={CloseStop}> s </button>
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
            <button className='balButton' disabled={isSending}  value={longPositionRef.current.value + " SELL LONG " + pair} onClick={MarketClose}>L</button>
            <input ref={longPositionRef} className="balInput" type="text" onChange={(e) => setLongPosition(e.target.value)} value={longPosition ? longPosition : ""} />
          </div>
          <div className='balFlex'>
            <button className="balButton" disabled={isSending}  value={shortPositionRef.current.value + " BUY SHORT " + pair} onClick={MarketClose}>S</button>
            <input ref={shortPositionRef} className="balInput" type="text" onChange={(e) => setShortPosition(e.target.value)} value={shortPosition ? shortPosition : ""} />
          </div>
        </div>
      </div>
      <div className='tradeCategory'>
        <div className='inputGroup'>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={nHighPrice ? nHighPrice + " BUY LONG LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nHighPrice ? nHighPrice + " SELL SHORT LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}> S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nHighPrice ? nHighPrice + " SELL LONG LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}> l </button>
            <button className='tradeButton' type="button" disabled={isSending} value={nHighPrice ? nHighPrice + " BUY SHORT LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}> s </button>
          </div> 
          <div className='tradeFlex'>
            <button className='incButton' type="button" value={nHighPrice ? nHighPrice : ""} onClick={decFuncHighn}>-</button>
            <input className="tradeInput" type="text" onChange={(e) => setNHighPrice(e.target.value)} value={nHighPrice ? nHighPrice : ""} />
            <button className='incButton' type="button" value={nHighPrice ? nHighPrice : ""} onClick={incFuncHighn}>+</button>
          </div>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={nHighPrice ? nHighPrice + " BUY LONG STOP " + pair : ""} onClick={OpenStop}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nHighPrice ? nHighPrice + " SELL SHORT STOP " + pair : ""} onClick={OpenStop}> S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nHighPrice ? nHighPrice + " SELL LONG STOP " + pair : ""} onClick={CloseStop}> l </button>
            <button className='tradeButton' type="button" disabled={isSending} value={nHighPrice ? nHighPrice + " BUY SHORT STOP " + pair : ""} onClick={CloseStop}> s </button>
          </div>  
        </div>
        <div className='inputGroup'>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={nOpenPrice ? nOpenPrice + " BUY LONG LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nOpenPrice ? nOpenPrice + " SELL SHORT LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}>S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nOpenPrice ? nOpenPrice + " SELL LONG LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}>l</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nOpenPrice ? nOpenPrice + " BUY SHORT LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}>s</button>
          </div>
          <div className='tradeFlex'>
            <button className='incButton' type="button" value={nOpenPrice ? nOpenPrice : ""} onClick={decFuncOpenn}>-</button>
            <input className="tradeInput" type="text" onChange={(e) => setNOpenPrice(e.target.value)} value={nOpenPrice ? nOpenPrice : ""} />
            <button className='incButton' type="button" value={nOpenPrice ? nOpenPrice : ""} onClick={incFuncOpenn}>+</button>
          </div>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={nOpenPrice ? nOpenPrice + " BUY LONG STOP " + pair : ""} onClick={OpenStop}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nOpenPrice ? nOpenPrice + " SELL SHORT STOP " + pair : ""} onClick={OpenStop}>S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nOpenPrice ? nOpenPrice + " SELL LONG STOP " + pair : ""} onClick={CloseStop}>l</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nOpenPrice ? nOpenPrice + " BUY SHORT STOP " + pair : ""} onClick={CloseStop}>s</button>
          </div>
        </div>
        <div className='inputGroup'>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={nClosePrice ? nClosePrice + " BUY LONG LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nClosePrice ? nClosePrice + " SELL SHORT LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}>S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nClosePrice ? nClosePrice + " SELL LONG LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}>l</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nClosePrice ? nClosePrice + " BUY SHORT LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}>s</button>
          </div>
          <div className='tradeFlex'>
            <button className='incButton' type="button" value={nClosePrice ? nClosePrice : ""} onClick={decFuncClosen}>-</button>
            <input className="tradeInput" type="text" onChange={(e) => setNClosePrice(e.target.value)} value={nClosePrice ? nClosePrice : ""} />
            <button className='incButton' type="button" value={nClosePrice ? nClosePrice : ""} onClick={incFuncClosen}>+</button>
          </div>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={nClosePrice ? nClosePrice + " BUY LONG STOP " + pair : ""} onClick={OpenStop}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nClosePrice ? nClosePrice + " SELL SHORT STOP " + pair : ""} onClick={OpenStop}>S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nClosePrice ? nClosePrice + " SELL LONG STOP " + pair : ""} onClick={CloseStop}>l</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nClosePrice ? nClosePrice + " BUY SHORT STOP " + pair : ""} onClick={CloseStop}>s</button>
          </div>
        </div>
        <div className='inputGroup'>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={nLowPrice ? nLowPrice + " BUY LONG LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nLowPrice ? nLowPrice + " SELL SHORT LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}> S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nLowPrice ? nLowPrice + " SELL LONG LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}> l </button>
            <button className='tradeButton' type="button" disabled={isSending} value={nLowPrice ? nLowPrice + " BUY SHORT LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}> s </button>
          </div>
          <div className='tradeFlex'>
            <button className='incButton' type="button" value={nLowPrice ? nLowPrice : ""} onClick={decFuncLown}>-</button>
            <input className="tradeInput" type="text"  onChange={(e) => setNLowPrice(e.target.value)} value={nLowPrice ? nLowPrice : ""} />
            <button className='incButton' type="button" value={nLowPrice ? nLowPrice : ""} onClick={incFuncLown}>+</button>
          </div>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={nLowPrice ? nLowPrice + " BUY LONG STOP " + pair : ""} onClick={OpenStop}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nLowPrice ? nLowPrice + " SELL SHORT STOP " + pair : ""} onClick={OpenStop}> S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nLowPrice ? nLowPrice + " SELL LONG STOP " + pair : ""} onClick={CloseStop}> l </button>
            <button className='tradeButton' type="button" disabled={isSending} value={nLowPrice ? nLowPrice + " BUY SHORT STOP " + pair : ""} onClick={CloseStop}> s </button>
          </div>
        </div>
        <div className='inputGroup'>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={nAvPrice ? nAvPrice + " BUY LONG LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nAvPrice ? nAvPrice + " SELL SHORT LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}> S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nAvPrice ? nAvPrice + " SELL LONG LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}> l </button>
            <button className='tradeButton' type="button" disabled={isSending} value={nAvPrice ? nAvPrice + " BUY SHORT LIMIT " + pair + " " + limitSafe : ""} onClick={dummyFunc}> s </button>
          </div>
          <div className='tradeFlex'>
            <button className='incButton' type="button" value={nAvPrice ? nAvPrice : ""} onClick={decFuncAvpn}>-</button>
            <input className="tradeInput" type="text"  onChange={(e) => setNAvPrice(e.target.value)} value={nAvPrice ? nAvPrice : ""} />
            <button className='incButton' type="button" value={nAvPrice ? nAvPrice : ""} onClick={incFuncAvpn}>+</button>
          </div>
          <div className='tradeFlex'>
            <button className='tradeButton' type="button" disabled={isSending} value={nAvPrice ? nAvPrice + " BUY LONG STOP " + pair : ""} onClick={OpenStop}>L</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nAvPrice ? nAvPrice + " SELL SHORT STOP " + pair : ""} onClick={OpenStop}> S</button>
            <button className='tradeButton' type="button" disabled={isSending} value={nAvPrice ? nAvPrice + " SELL LONG STOP " + pair : ""} onClick={CloseStop}> l </button>
            <button className='tradeButton' type="button" disabled={isSending} value={nAvPrice ? nAvPrice + " BUY SHORT STOP " + pair : ""} onClick={CloseStop}> s </button>
          </div>
        </div>
        <div className='inputGroup'>
         <div className='balFlex'>
            <button className='balButton' disabled={isSending}  value={pair} onClick={getPos}>P</button>
            <input ref={limitRef} className="balInput" type="text" onChange={(e) => setLimit(e.target.value)} value={limit ? limit : ""} />
          </div>
          <div className='balFlex'>
            <button className='balButton' disabled={isSending} value={pair} onClick={getCurrentOrders}>O</button>
            <input ref={orderPairRef} className="balInput" type="text" onChange={(e) => setOrderPair(e.target.value)} value={orderPair ? orderPair : ""} />
          </div>
          <div className='balFlex'>
            <button className="balButton" disabled={isSending} onClick={getBal} >B</button>
            <input ref={currentBalanceRef} className="balInput" type="text" onChange={setBal} value={currentBalance ? currentBalance : ""} />
          </div>
        </div>
     </div>
     <Order order={props.order} currentOrder={currentOrderProp} />
     <Position position={props.position} currentPosition={Qty} pair={props.pair} />  
    </div>
  );
});
export default Trade;
