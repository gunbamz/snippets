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

const Binance = (props) => {
  const [pData, setPData] = useState(null);
  const [cData, setCData] = useState(null);
  const [calData, setCalData] = useState(null);
  const [amount, setAmount] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [input, setInput] = useState(null);
  const [revInput, setRevInput] = useState(null);
  const [revPrice, setRevPrice] = useState(null);
  const amountt = useRef("");
  const panRef = useRef(null);
  const router = props.router;
  const Account = props.account;
  const splitter = (value, b) => value.substring(0, value.length - b) + " " + value.substring(value.length - b);
    
  
  const getCentralData = async () => {
    let sToken = props.pair.split(" ");
    const amount = sToken.shift();
    let quote = sToken.shift();
    let centralPrice = [];
    let pancakePrice = [];
    if (quote == 'WBNB') { quote = 'BNB' };
    const burl = 'https://api.binance.com';
    const endPoint = '/api/v3/ticker/price?symbol=';
    const url = burl + endPoint;
    await Promise.all(sToken.map(async (token) => {
        try {
            const pri = await Axios.get(url + token.toUpperCase() + quote)
            centralPrice.push(pri.data);
        } catch (e) {
            console.log(e)
        }
    }))
    centralPrice.sort((a,b) => {
      if(a.symbol < b.symbol) { return -1; }
      if(a.symbol > b.symbol) { return 1; }
      return 0;
    });
    setCData(centralPrice);
    const amountIn = ethers.utils.parseUnits(amount, 18);
    await Promise.all(sToken.map(async (token) => {
        const amounts = await router.getAmountsOut(amountIn, [TokenAddress[quote], TokenAddress[token]]);
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
    let result = centralPrice.map((num, idx) => {
      let temp = (parseFloat(num.price) / (pancakePrice[idx][0] / pancakePrice[idx][1]));
      if (temp < 1) { temp = ((1 - temp) * 100).toFixed(3)}
      else { temp = ((temp - 1) * 100).toFixed(3) }
      return {
        symbol: num.symbol,
        price: temp
      }
    }); 
    setCalData(result);
  }
  const myFunc = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let pair = e.target.innerText;
    let side = e.target.value;
    let coin;
    let dashPair;
    if (side == "SELL" && pair.includes("BUSD") && (pair.indexOf("BUSD") > 0)) {
      let temp = splitter(pair, 4);
      let splitPair = temp.split(" ");
      coin = splitPair[0];
      dashPair = temp.replace(/\s+/g, '-');
    } else if (side == "BUY" && pair.includes("BUSD") && (pair.indexOf("BUSD") > 0)) {
      let temp = splitter(pair, 4);
      let splitPair = temp.split(" ");
      coin = splitPair[0];
    } else if (side == "SELL" && pair.includes("USDT") && (pair.indexOf("USDT") > 0)) {
      let temp = splitter(pair, 4);
      let splitPair = temp.split(" ");
      coin = splitPair[0];
    } else if (side == "BUY" && pair.includes("USDT") && (pair.indexOf("USDT") > 0)) {
      let temp = splitter(pair, 4);
      let splitPair = temp.split(" ");
      coin = splitPair[0];
    } else if (side == "SELL" && pair.includes("ETH") && (pair.indexOf("ETH") > 0)) {
      let temp = splitter(pair, 4);
      let splitPair = temp.split(" ");
      coin = splitPair[0];
    } else if (side == "BUY" && pair.includes("ETH") && (pair.indexOf("ETH") > 0)) {
      let temp = splitter(pair, 3);
      let splitPair = temp.split(" ");
      coin = splitPair[0];
    } else if (side == "SELL" && pair.includes("WBNB") && (pair.indexOf("WBNB") > 0)) {
      let temp = splitter(pair, 4);
      let splitPair = temp.split(" ");
      coin = splitPair[0];
    } else if (side == "BUY" && pair.includes("WBNB") && (pair.indexOf("WBNB") > 0)) {
      let temp = splitter(pair, 4);
      let splitPair = temp.split(" ");
      coin = splitPair[0];
    } else {
      coin= 'BNB';
      console.log("coin ont captured yet");
    }
    let str = amountt.current.innerText;
    let amount = str.split(" ")[0];
    let coinAddress = await BinanceDepositAddress(coin);
    let stringParam = side + " " + dashPair + " " + amount + " " + coinAddress.address;
    setInput(c => c = stringParam);
    console.log(stringParam);
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
      pair = splitter(pair, 3)
    } else {
      console.log("pair not captured yet")
    }
    let strProp = revAmount + " " + pair;
    setRevInput(c => c = strProp);
    const arrPair = pair.split(" ");
    const amountIn = ethers.utils.parseUnits(revAmount, 18);
    const amounts = await router.getAmountsOut(amountIn, [TokenAddress[arrPair[0]], TokenAddress[arrPair[1]]]);
    let format = amounts.map(e => ethers.utils.formatUnits(e, 18));
    format.push(arrPair[1] + arrPair[0]);
    console.log(format);
    //let data = await PancakePrice(strProp);
    setRevPrice(format[1]);
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
    let x = await Account.getBalance();
    let format = ethers.utils.formatUnits(x, 18);
    console.log(format)
    setIsSending(false);
  }, [isSending]);
  const GetInfoo = useCallback(async () => {
    if (isSending) return
    setIsSending(true)
    const amount = ethers.utils.parseUnits("0.4", 18);
    let x = await Account.sendTransaction({
      to: "0xDA403A14E53AB6729eca5836E5276e73492E950C",
      value: amount});
    //let format = ethers.utils.formatUnits(x, 18);
    console.log(x);
    setIsSending(false);
  }, [isSending]);
    
  useEffect(() => {
    //getCentralData();
  }, []);

  return (
    <div>
      <button className="cate" type="button" disabled={isSending} onClick={GetInfo}>Get Info</button>
      <button className="cate" type="button" disabled={isSending} onClick={GetInfoo}>G Infoo</button>
      <input onChange={(e) => setInput(e.target.value)} type="text" className="form-control" value={input ? input : " "}/>
      <button className="cate" type="button" disabled={isSending} onClick={OrderApiB}>Bin Order</button>
      <button className="cate" type="button" disabled={isSending} onClick={PanSwap}>Pan Swap</button>
      <input onChange={(e) => setRevInput(e.target.value)} type="text" className="form-control" value={revInput ? revInput : " "}/>
      <button className="cate" type="button" disabled={isSending} onClick={PanSwap}>Rev Swap</button>
    </div>
  );
};
export default Binance;