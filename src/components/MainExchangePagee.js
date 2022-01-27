import React, { useState, useEffect, useCallback, useRef } from "react";
import * as ethers from 'ethers';
import Axios from "axios";
import BinanceCoinList from "../lib/BinanceCoinList";
import BinanceOrder from "../lib/BinanceOrder";
import BinanceDepositAddress from "../lib/BinanceDepositAddress";
import PancakeSwap from "../lib/PancakeSwap";
import PancakePrice from "../lib/PancakePrice";
import TokenAddress from "../lib/utils.js";
import "./pancake.css";

const MainExchangePagee = (props) => {
  const [pData, setPData] = useState(null);
  const [cData, setCData] = useState(null);
  const [calData, setCalData] = useState(null);
  const [amount, setAmount] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [inputBinance, setInputBinance] = useState(null);
  const [inputSwap, setInputSwap] = useState(null);
  const [inputRevswap, setInputRevswap] = useState(null);
  const [revData, setRevData] = useState(null);
  const amountt = useRef("");
  const revRef = useRef("");
  const kyberRouter = props.kyberRouter;
  const account = props.account;
  const kyberFactory = props.kyberFactory;
  const pancakeRouter = props.pancakeRouter;
  const Account = props.account;
  const splitter = (value, b) => value.substring(0, value.length - b) + " " + value.substring(value.length - b);
    
  
  const getCentralData = async () => {
    let sToken = props.pair.split(" ");
    const amount = sToken.shift();
    let quote = sToken.shift();
    let centralPrice = [];
    let pancakePrice = [];
    let kyberPrice = [];
    // if (quote == 'WBNB') { quote = 'BNB' };
    // const burl = 'https://api.binance.com';
    // const endPoint = '/api/v3/ticker/price?symbol=';
    // const url = burl + endPoint;
    // await Promise.all(sToken.map(async (token) => {
    //     try {
    //         const pri = await Axios.get(url + token.toUpperCase() + quote)
    //         centralPrice.push(pri.data);
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }))
    // centralPrice.sort((a,b) => {
    //   if(a.symbol < b.symbol) { return -1; }
    //   if(a.symbol > b.symbol) { return 1; }
    //   return 0;
    // });
    //setCData(centralPrice);
    if (quote == 'BNB') { quote = 'WBNB' };
    const amountIn = ethers.utils.parseUnits(amount, 18);
    await Promise.all(sToken.map(async (token) => {
        const amounts = await pancakeRouter.getAmountsOut(amountIn, [TokenAddress[quote], TokenAddress[token]]);
        const format = amounts.map(e => ethers.utils.formatUnits(e, 18));
        format.push(token + quote);
        pancakePrice.push(format);
    }))
    pancakePrice.sort((a,b) => {
      if(a[2] < b[2]) { return -1; }
      if(a[2] > b[2]) { return 1; }
      return 0;
    });
    setAmount(pancakePrice[0][0]);
    setPData(pancakePrice);
    //const amountIn = ethers.utils.parseUnits(amount, 18);
    // await Promise.all(sToken.map(async (token) => {
    //     const amounts = await kyberRouter.getAmountsOut(amountIn, [TokenAddress[quote], TokenAddress[token]]);
    //     const format = amounts.map(e => ethers.utils.formatUnits(e, 18));
    //     format.push(token + quote);
    //     pancakePrice.push(format);
    // }))
    // kyberPrice.sort((a,b) => {
    //   if(a[2] < b[2]) { return -1; }
    //   if(a[2] > b[2]) { return 1; }
    //   return 0;
    // });
    // let result = centralPrice.map((num, idx) => {
    //   let temp = (parseFloat(num.price) / (pancakePrice[idx][0] / pancakePrice[idx][1]));
    //   if (temp < 1) { temp = ((1 - temp) * 100).toFixed(3)}
    //   else { temp = ((temp - 1) * 100).toFixed(3) }
    //   return {
    //     symbol: num.symbol,
    //     price: temp
    //   }
    // }); 
    // setCalData(result);
  }
  const myFunc = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let pair = e.target.innerText;
    let side = e.target.value;
    let coin;
    if (pair.includes("BUSD") && (pair.indexOf("BUSD") > 0)) {
      let temp = splitter(pair, 4);
      let splitPair = temp.split(" ");
      coin = splitPair[0];
      dashPair = temp.replace(/\s+/g, '-');
    } else if (pair.includes("BUSD") && (pair.indexOf("BUSD") > 0)) {
      let temp = splitter(pair, 4);
      let splitPair = temp.split(" ");
      coin = splitPair[0];
    } else if (pair.includes("USDT") && (pair.indexOf("USDT") > 0)) {
      let temp = splitter(pair, 4);
      let splitPair = temp.split(" ");
      coin = splitPair[0];
    } else if (pair.includes("USDT") && (pair.indexOf("USDT") > 0)) {
      let temp = splitter(pair, 4);
      let splitPair = temp.split(" ");
      coin = splitPair[0];
    } else if (pair.includes("ETH") && (pair.indexOf("ETH") > 0)) {
      let temp = splitter(pair, 4);
      let splitPair = temp.split(" ");
      coin = splitPair[0];
    } else if (pair.includes("ETH") && (pair.indexOf("ETH") > 0)) {
      let temp = splitter(pair, 3);
      let splitPair = temp.split(" ");
      coin = splitPair[0];
    } else if (pair.includes("WBNB") && (pair.indexOf("WBNB") > 0)) {
      let temp = splitter(pair, 4);
      let splitPair = temp.split(" ");
      coin = splitPair[0];
    } else if (pair.includes("WBNB") && (pair.indexOf("WBNB") > 0)) {
      let temp = splitter(pair, 4);
      let splitPair = temp.split(" ");
      coin = splitPair[0];
    } else {
      coin= 'BNB';
      console.log("coin ont captured yet");
    }
    // let str = amountt.current.innerText;
    // let coinAddress = await BinanceDepositAddress(coin);
    // let strParamBinance = side + " " + pair + " " + str + " " + coinAddress.address;
    // setInputBinance(c => c = strParamBinance);
    // console.log(strParamBinance);
    setIsSending(false);
  }, [isSending]);

  const myFun = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let price = e.target.innerText;
    let pair = e.target.value;
    let currentProp = props.pair.split(" ");
    let revAmount = (parseFloat(currentProp[0]/parseFloat(price))).toFixed(3);
    if (pair.includes("BUSD")) {
      pair = splitter(pair, 4);
    } else if (pair.includes("WBNB")) {
      pair = splitter(pair, 4);
    } else if (pair.includes("ETH")) {
      pair = splitter(pair, 3);
    } else if (pair.includes("USDT")) {
      pair = splitter(pair, 4);
    } else if (pair.includes("BNB")) {
      pair = splitter(pair, 3);
    } else {
      console.log("pair not captured yet")
    }
    let swapAmount = currentProp[0];
    pair = pair.split(" ");
    let strProp = swapAmount + " " + pair[0] + "-" + pair[1];
    let revStrProp = revAmount + " " + pair[1] +  "-" + pair[0];
    setInputSwap(c => c = strProp);
    setInputRevswap(c => c = revStrProp);
    console.log(revAmount)
    const amountIn = ethers.utils.parseUnits(revAmount, 18);
    const amounts = await pancakeRouter.getAmountsOut(amountIn, [TokenAddress[pair[0]], TokenAddress[pair[1]]]);
    let format = amounts.map(e => ethers.utils.formatUnits(e, 18));
    format.push(pair[1] + pair[0]);
    format.push(currentProp[0]);
    console.log(format);
    setRevData(format);
    setIsSending(false);
  }, [isSending]);

  const OrderApiB = useCallback(async () => {
    if (isSending) return
    setIsSending(true);
    let param = input;
    const res = await BinanceOrder(param);
    console.log(res);
    setIsSending(false);
  }, [isSending]);

  const PanSwap = useCallback(async () => {
    if (isSending) return
    setIsSending(true);
    let param = input;
    const resp = await PancakeSwap(param);
    console.log(resp);
    setIsSending(false);
  }, [isSending]);

  const GetInfo = useCallback(async () => {
    if (isSending) return
    setIsSending(true)
    let x = await Account.getAddress();
    console.log(x)
    setIsSending(false);
  }, [isSending]);

  const GetWInfo = useCallback(async () => {
    if (isSending) return
    setIsSending(true)
    //let x = await BinanceCoinList();
    let x = await Account.getBalance();
    let format = ethers.utils.formatUnits(x, 18);
    console.log(format);
    setIsSending(false);
  }, [isSending]);
  const wbnb = new ethers.Contract(
    TokenAddress.WBNB,
    [
      'function totalSupply() external view returns (uint256)',
    ],
    account
  );
  const knc = new ethers.Contract(
    TokenAddress.KNC,
    [
      'function totalSupply() external view returns (uint256)',
    ],
    account
  );
  const kyber = async () => {
    let x = await kyberFactory.getFeeConfiguration();
    console.log(x);
  }  
  useEffect(() => {
    getCentralData();
  }, []);

  return (
    <div>
      <p ref={amountt}>{amount}</p><span>in Amount of token</span>
      <button className="cate" type="button" disabled={isSending} onClick={GetInfo}>Reverse P</button>
      <button className="cate" type="button" disabled={isSending} onClick={kyber}>G Info</button>
      <p> Reverse Data with AMOUNT:&nbsp;<span ref={revRef}>{revData && revData[0]}</span>&nbsp;PRICE&nbsp;<span>{revData && revData[1]}</span>&nbsp;In PAIR &nbsp;<span>{revData && revData[2]}</span></p>
      <p>Pancake SELL: {pData && pData.map((a,b) => (<span key={b}><button className="cat" onClick={myFunc} value="SELL">{a[2]}</button><button value={a[2]} onClick={myFun}>{(parseFloat(amount)/parseFloat(a[1])).toFixed(3)}</button></span>))}</p>
      <p>Binance:&nbsp;&nbsp;
        <input onChange={(e) => setInputBinance(e.target.value)} type="text" className="form-control" value={inputBinance ? inputBinance : " "}/>
        <button className="cate" type="button" disabled={isSending} onClick={OrderApiB}>Bin Order</button>
      </p>
      <p>Pancake Swap:&nbsp;&nbsp;
      <input onChange={(e) => setInputSwap(e.target.value)} type="text" className="form-control" value={inputSwap ? inputSwap : " "}/>
      <button className="cate" type="button" disabled={isSending} onClick={PanSwap}>Swap</button>&nbsp;&nbsp;
      <input onChange={(e) => setInputRevswap(e.target.value)} type="text" className="form-control" value={inputRevswap ? inputRevswap : " "}/>
      <button className="cate" type="button" disabled={isSending} onClick={PanSwap}>Rev Swap</button>
      </p>
    </div>
  );
};
export default MainExchangePagee;
//<p>Binance Rate: {calData && calData.map((a,b) => (<span key={b}>{a.symbol}&nbsp;&nbsp;{a.price}%&nbsp;&nbsp;</span>))}</p>
//<p>Binance BUY: {cData && cData.map((a,b) => (<span key={b}><button className="cat" onClick={myFunc} value="BUY">{a.symbol}</button><button value={a.symbol} onClick={myFun}>{parseFloat(a.price).toFixed(3)}</button>&nbsp;&nbsp;</span>))}</p>