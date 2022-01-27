import React, { useState, useEffect, useCallback, useRef } from "react";
import BinanceFOrder from '../lib/BinanceFOrder';
import GetAccountBalance from '../lib/GetAccountBalance';
import './trade.css';

const Trade = (props) => {
  const [highPrice, setHighPrice] = useState(null);
  const [openPrice, setOpenPrice] = useState(null);
  const [closePrice, setClosePrice] = useState(null);
  const [lowPrice, setLowPrice] = useState(null);
  const [avPrice, setAvPrice] = useState(null);
  const [fillPrice, setFillPrice] = useState(null);
  const [nHighPrice, setNHighPrice] = useState(null);
  const [nOpenPrice, setNOpenPrice] = useState(null);
  const [nClosePrice, setNClosePrice] = useState(null);
  const [nLowPrice, setNLowPrice] = useState(null);
  const [nAvPrice, setNAvPrice] = useState(null);
  const [currentBalance, setCurrentBalance] = useState("0.9997 1.0003");
  const [isSending, setIsSending] = useState(false);
  const highPriceRef = useRef("");
  const openPriceRef = useRef("");
  const closePriceRef = useRef("");
  const lowPriceRef = useRef("");
  const nHighPriceRef = useRef("");
  const nOpenPriceRef = useRef("");
  const nClosePriceRef = useRef("");
  const nLowPriceRef = useRef("");
  const nAvPriceRef = useRef("");
  const avPriceRef = useRef("");
  const fillPriceRef = useRef("");
  const currentBalanceRef = useRef("");

  const limitLinc = 1.0003;
  const limitSdec = 0.9997;
  const incInt = 1.000029098;
  const decInt = 0.999970902;

  const avR = (a) => {
    let high = parseFloat(a.h);
    let low = parseFloat(a.l);
    let open = parseFloat(a.o);
    let close = parseFloat(a.c);
    let ave = (high/4 + low/4 + open/4 + close/4).toFixed(2);
    setAvPrice(e => e = (ave))
  }

  const OpenLong = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let priceSide = e.target.value;
    let stopPrice = parseFloat(priceSide.split(" ")[0]) * limitLinc;
    let balParam = currentBalanceRef.current.value.split(" ");
    let qty = (parseFloat(balParam[0]) * parseFloat(balParam[1])) / stopPrice;
    let strPar = "STOP GTC";
    let params = priceSide + " " + stopPrice.toFixed(5) + " " + qty.toFixed(5) + " " + strPar;
    // const res = await BinanceFOrder(params);
    console.log(params)
    setIsSending(false);
  }, [isSending]);
  const OpenShort = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let priceSide = e.target.value;
    let stopPrice = parseFloat(priceSide.split(" ")[0]) * limitSdec;
    let balParam = currentBalanceRef.current.value.split(" ");
    let qty = (parseFloat(balParam[0]) * parseFloat(balParam[1])) / stopPrice;
    let strPar = "STOP GTC";
    let params = priceSide + " " + stopPrice + " " + qty + " " + strPar;
    const res = await BinanceFOrder(params);
    console.log(res);
    setIsSending(false);
  }, [isSending]);
  const CloseLong = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let priceSide = e.target.value;
    let stopPrice = parseFloat(priceSide.split(" ")[0]) * limitSdec;
    let balParam = currentBalanceRef.current.value.split(" ");
    let qty = (parseFloat(balParam[0]) * parseFloat(balParam[1])) / stopPrice;
    let strPar = "STOP GTC";
    let params = priceSide + " " + stopPrice + " " + qty + " " + strPar;
    // const res = await BinanceFOrder(params);
    setIsSending(false);
  }, [isSending]);
  const CloseShort = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let priceSide = e.target.value;
    let stopPrice = parseFloat(priceSide.split(" ")[0]) * limitLinc;
    let balParam = currentBalanceRef.current.value.split(" ");
    let qty = (parseFloat(balParam[0]) * parseFloat(balParam[1])) / stopPrice;
    let strPar = "STOP GTC";
    let params = priceSide + " " + stopPrice + " " + qty + " " + strPar;
    // const res = await BinanceFOrder(params);
    setIsSending(false);
  }, [isSending]);

  const decFuncHigh = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let price = e.target.value
    let newP = parseFloat(price) * decInt;
    setHighPrice(c => c = newP);
    setIsSending(false);
  }, [isSending]);
  const incFuncHigh = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let price = e.target.value;
    let newP = parseFloat(price) * incInt;
    setHighPrice(c => c = newP);
    setIsSending(false);
  }, [isSending]);
  const decFuncOpen = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let price = e.target.value
    let newP = parseFloat(price) * decInt;
    setOpenPrice(c => c = newP);
    setIsSending(false);
  }, [isSending]);
  const incFuncOpen = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let price = e.target.value;
    let newP = parseFloat(price) * incInt;
    setOpenPrice(c => c = newP);
    setIsSending(false);
  }, [isSending]);
  const decFuncClose = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let price = e.target.value
    let newP = parseFloat(price) * decInt;
    setClosePrice(c => c = newP);
    setIsSending(false);
  }, [isSending]);
  const incFuncClose = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let price = e.target.value;
    let newP = parseFloat(price) * incInt;
    setClosePrice(c => c = newP);
    setIsSending(false);
  }, [isSending]);
  const decFuncLow = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let price = e.target.value
    let newP = parseFloat(price) * decInt;
    setLowPrice(c => c = newP);
    setIsSending(false);
  }, [isSending]);
  const incFuncLow = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let price = e.target.value;
    let newP = parseFloat(price) * incInt;
    setLowPrice(c => c = newP);
    setIsSending(false);
  }, [isSending]);
  const decFuncAvp = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let price = e.target.value
    let newP = parseFloat(price) * decInt;
    setAvPrice(c => c = newP);
    setIsSending(false);
  }, [isSending]);
  const incFuncAvp = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let price = e.target.value;
    let newP = parseFloat(price) * incInt;
    setAvPrice(c => c = newP);
    setIsSending(false);
  }, [isSending]);
  const decFuncFill = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let price = e.target.value
    let newP = parseFloat(price) * decInt;
    setFillPrice(c => c = newP);
    setIsSending(false);
  }, [isSending]);
  const incFuncFill = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let price = e.target.value;
    let newP = parseFloat(price) * incInt;
    setFillPrice(c => c = newP);
    setIsSending(false);
  }, [isSending]);
  const decFunc = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let price = e.target.value
    setIsSending(false);
  }, [isSending]);
  const incFunc = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let price = e.target.value;
    setIsSending(false);
  }, [isSending]);

  const getBal = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let balance = await GetAccountBalance();
    console.log(balance);
    setIsSending(false);
  }, [isSending]);

  useEffect(() => {
   //getBal();
  }, []);
  
  return (
    <div className='tradeSection'>
      <div className='tradeCategory'>
        <div>
          <div className='tradeFlex'>
            <button className='tradeButton' onClick={decFuncHigh} value={highPrice ? highPrice : " "}>-</button>
            <span>high</span>
            <button className='tradeButton' onClick={incFuncHigh} value={highPrice ? highPrice : " "}>+</button>
          </div>
          <input className="tradeInput" ref={highPriceRef} type="text" onChange={(e) => setHighPrice(e.target.value)} value={highPrice ? highPrice : " "} />
          <div className='tradeFlex'>
            <button className='tradeButton' value={highPrice ? highPrice + " BUY LONG " + props.pair : " "} onClick={OpenLong}>L</button>
            <button className='tradeButton' value={highPrice ? highPrice + " SELL SHORT " + props.pair : " "} onClick={OpenShort}> S</button>
            <button className='tradeButton' value={highPrice ? highPrice + " SELL LONG " + props.pair : " "} onClick={CloseLong}> l </button>
            <button className='tradeButton' value={highPrice ? highPrice + " BUY SHORT " + props.pair : " "} onClick={CloseShort}> s </button>
          </div>  
        </div>
        <div>
          <div className='tradeFlex'>
            <button className='tradeButton' onClick={decFuncOpen} value={openPrice ? openPrice : " "}>-</button>
            <span>open</span>
            <button className='tradeButton' onClick={incFuncOpen} value={openPrice ? openPrice : " "}>+</button>
          </div>
          <input className="tradeInput" ref={openPriceRef} type="text" onChange={(e) => setOpenPrice(e.target.value)} value={openPrice ? openPrice : " "} />
          <div className='tradeFlex'>
            <button className='tradeButton' value={openPrice ? openPrice + " BUY LONG " + props.pair : " "} onClick={OpenLong}>L</button>
            <button className='tradeButton' value={openPrice ? openPrice + " SELL SHORT " + props.pair : " "} onClick={OpenShort}> S</button>
            <button className='tradeButton' value={openPrice ? openPrice + " CLOSE LONG " + props.pair : " "} onClick={CloseLong}> l </button>
            <button className='tradeButton' value={openPrice ? openPrice + " CLOSE SHORT " + props.pair : " "} onClick={CloseShort}> s </button>
          </div>
        </div>
        <div>
          <div className='tradeFlex'>
            <button className='tradeButton' onClick={decFuncClose} value={closePrice ? closePrice : " "}>-</button>
            <span>clos</span>
            <button className='tradeButton' onClick={incFuncClose} value={closePrice ? closePrice : " "}>+</button>
          </div>
          <input className="tradeInput" ref={closePriceRef} type="text" onChange={(e) => setClosePrice(e.target.value)} value={closePrice ? closePrice : " "} />
          <div className='tradeFlex'>
            <button className='tradeButton' value={closePrice ? closePrice + " BUY LONG " + props.pair : " "} onClick={OpenLong}>L</button>
            <button className='tradeButton' value={closePrice ? closePrice + " SELL SHORT " + props.pair : " "} onClick={OpenShort}> S</button>
            <button className='tradeButton' value={closePrice ? closePrice + " CLOSE LONG " + props.pair : " "} onClick={CloseLong}> l </button>
            <button className='tradeButton' value={closePrice ? closePrice + " CLOSE SHORT " + props.pair : " "} onClick={CloseShort}> s </button>
          </div>
        </div>
        <div>
          <div className='tradeFlex'>
            <button className='tradeButton' onClick={decFuncLow} value={lowPrice ? lowPrice : " "}>-</button>
            <span>low</span>
            <button className='tradeButton' onClick={incFuncLow} value={lowPrice ? lowPrice : " "}>+</button>
          </div>
          <input className="tradeInput" ref={lowPriceRef} type="text"  onChange={(e) => setLowPrice(e.target.value)} value={lowPrice ? lowPrice : " "} />
          <div className='tradeFlex'>
            <button className='tradeButton' value={lowPrice ? lowPrice + " BUY LONG " + props.pair : " "} onClick={OpenLong}>L</button>
            <button className='tradeButton' value={lowPrice ? lowPrice + " SELL SHORT " + props.pair : " "} onClick={OpenShort}> S</button>
            <button className='tradeButton' value={lowPrice ? lowPrice + " CLOSE LONG " + props.pair : " "} onClick={CloseLong}> l </button>
            <button className='tradeButton' value={lowPrice ? lowPrice + " CLOSE SHORT " + props.pair : " "} onClick={CloseShort}> s </button>
          </div>
        </div>
        <div>
          <div className='tradeFlex'>
            <button className='tradeButton'  onClick={decFuncAvp} value={avPrice ? avPrice : " "}>-</button>
            <span>AvP</span>
            <button className='tradeButton' onClick={incFuncAvp} value={avPrice ? avPrice : " "}>+</button>
          </div>
          <input className="tradeInput" ref={avPriceRef} type="text"  onChange={(e) => setAvPrice(e.target.value)} value={avPrice ? avPrice : " "} />
          <div className='tradeFlex'>
            <button className='tradeButton' value={avPrice ? avPrice + " BUY LONG " + props.pair : " "} onClick={OpenLong}>L</button>
            <button className='tradeButton' value={avPrice ? avPrice + " SELL SHORT " + props.pair : " "} onClick={OpenShort}> S</button>
            <button className='tradeButton' value={avPrice ? avPrice + " CLOSE LONG " + props.pair : " "} onClick={CloseLong}> l </button>
            <button className='tradeButton' value={avPrice ? avPrice + " CLOSE SHORT " + props.pair : " "} onClick={CloseShort}> s </button>
          </div>
        </div>
        <div>
          <div className='tradeFlex'>
          <button className='tradeButton'  onClick={decFuncFill} value={fillPrice ? fillPrice : " "}>-</button>
          <span>fill</span>
          <button className='tradeButton' onClick={incFuncFill} value={fillPrice ? fillPrice : " "}>+</button>
          </div>
          <input className="tradeInput" ref={fillPriceRef} type="text" onChange={(e) => setFillPrice(e.target.value)} value={fillPrice ? fillPrice : " "} />
          <div className='tradeFlex'>
            <button className='tradeButton' value={fillPrice ? fillPrice + " BUY LONG " + props.pair : " "} onClick={OpenLong}>L</button>
            <button className='tradeButton' value={fillPrice ? fillPrice + " SELL SHORT " + props.pair : " "} onClick={OpenShort}> S</button>
            <button className='tradeButton' value={fillPrice ? fillPrice + " CLOSE LONG " + props.pair : " "} onClick={CloseLong}> l </button>
            <button className='tradeButton' value={fillPrice ? fillPrice + " CLOSE SHORT " + props.pair : " "} onClick={CloseShort}> s </button>
          </div>
        </div>
      </div>
      <div className='tradeCategory'>
        <div>
          <div className='tradeFlex'>
            <button className='tradeButton' onClick={decFunc} value={highPrice ? highPrice : " "}>-</button>
            <span>high</span>
            <button className='tradeButton' onClick={incFunc} value={highPrice ? highPrice : " "}>+</button>
          </div>
          <input className="tradeInput" ref={nHighPriceRef} type="text" onChange={(e) => setNHighPrice(e.target.value)} value={nHighPrice ? nHighPrice : " "} />
          <div className='tradeFlex'>
            <button className='tradeButton' value={nHighPrice} onClick={OpenLong}>L</button>
            <button className='tradeButton' value={nHighPrice} onClick={OpenShort}> S</button>
            <button className='tradeButton' value={nHighPrice} onClick={CloseLong}> l </button>
            <button className='tradeButton' value={nHighPrice} onClick={CloseShort}> s </button>
          </div>  
        </div>
        <div>
          <div className='tradeFlex'>
            <button className='tradeButton' onClick={decFunc} value={nOpenPriceRef.current.value ? nOpenPriceRef.current.value : " "}>-</button>
            <span>open</span>
            <button className='tradeButton' onClick={incFunc} value={nOpenPriceRef.current.value ? nOpenPriceRef.current.value : " "}>+</button>
          </div>
          <input className="tradeInput" ref={nOpenPriceRef} type="text"  onChange={(e) => setNOpenPrice(e.target.value)} value={nOpenPrice ? nOpenPrice : " "} />
          <div className='tradeFlex'>
            <button className='tradeButton' value={nOpenPrice} onClick={OpenLong}>L</button>
            <button className='tradeButton' value={nOpenPrice} onClick={OpenShort}> S</button>
            <button className='tradeButton' value={nOpenPrice} onClick={CloseLong}> l </button>
            <button className='tradeButton' value={nOpenPrice} onClick={CloseShort}> s </button>
          </div>
        </div>
        <div>
          <div className='tradeFlex'>
            <button className='tradeButton' onClick={decFunc} value={nClosePriceRef.current.value ? nClosePriceRef.current.value : " "}>-</button>
            <span>clos</span>
            <button className='tradeButton' onClick={incFunc} value={nClosePriceRef.current.value ? nClosePriceRef.current.value : " "}>+</button>
          </div>
          <input className="tradeInput" ref={nClosePriceRef} type="text" onChange={(e) => setNClosePrice(e.target.value)} value={nClosePrice ? nClosePrice : " "} />
          <div className='tradeFlex'>
            <button className='tradeButton' value={nClosePrice} onClick={OpenLong}>L</button>
            <button className='tradeButton' value={nClosePrice} onClick={OpenShort}> S</button>
            <button className='tradeButton' value={nClosePrice} onClick={CloseLong}> l </button>
            <button className='tradeButton' value={nClosePrice} onClick={CloseShort}> s </button>
          </div>
        </div>
        <div>
        <div className='tradeFlex'>
          <button className='tradeButton' onClick={decFunc} value={nLowPriceRef.current.value ? nLowPriceRef.current.value : " "}>-</button>
          <span>low</span>
          <button className='tradeButton' onClick={incFunc} value={nLowPriceRef.current.value ? nLowPriceRef.current.value : " "}>+</button>
         </div>
         <input className="tradeInput" ref={nLowPriceRef} type="text" onChange={(e) => setNLowPrice(e.target.value)} value={nLowPrice ? nLowPrice : " "} />
        <div className='tradeFlex'>
          <button className='tradeButton' value={nLowPrice} onClick={OpenLong}>L</button>
          <button className='tradeButton' value={nLowPrice} onClick={OpenShort}> S</button>
          <button className='tradeButton' value={nLowPrice} onClick={CloseLong}> l </button>
          <button className='tradeButton' value={nLowPrice} onClick={CloseShort}> s </button>
        </div>
      </div>
      <div>
        <div className='tradeFlex'>
          <button className='tradeButton' onClick={decFunc} value={nAvPriceRef.current.value ? nAvPriceRef.current.value : " "}>-</button>
          <span>NAv</span>
          <button className='tradeButton' onClick={incFunc} value={nAvPriceRef.current.value ? nAvPriceRef.current.value : " "}>+</button>
         </div>
         <input className="tradeInput" ref={nAvPriceRef} type="text" onChange={(e) => setNAvPrice(e.target.value)} value={nAvPrice ? nAvPrice : " "} />
        <div className='tradeFlex'>
          <button className='tradeButton' value={nAvPrice} onClick={OpenLong}>L</button>
          <button className='tradeButton' value={nAvPrice} onClick={OpenShort}> S</button>
          <button className='tradeButton' value={nAvPrice} onClick={CloseLong}> l </button>
          <button className='tradeButton' value={nAvPrice} onClick={CloseShort}> s </button>
        </div>
      </div>
      <div>
        <div className='tradeFlex'>
          <button className='tradeButton' onClick={decFunc} value={highPrice ? highPrice : " "}>-</button>
          <span>Curr</span>
          <button className='tradeButton' onClick={incFunc} value={highPrice ? highPrice : " "}>+</button>
         </div>
         <input className="tradeInput" ref={currentBalanceRef} type="text" onChange={(e) => setCurrentBalance(e.target.value)} value={currentBalance ? currentBalance : " "} />
        <div className='tradeFlex'>
          <button className='tradeButton'>L</button>
          <button className='tradeButton' onClick={getBal}> G </button>
          <button className='tradeButton'>S</button>
        </div>
      </div>
     </div>
    </div>
  );
};
export default Trade;