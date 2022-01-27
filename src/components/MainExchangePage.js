import React, { useState, useEffect, useCallback, useRef } from "react";
import * as ethers from "ethers";
import Axios from "axios";
import ExchangeInfo from "../lib/ExchangeInfo";
import BinanceWithdraw from "../lib/BinanceWithdraw";
import BinanceOrder from "../lib/BinanceOrder";
import BinanceCoinList from "../lib/BinanceCoinList";
import BinanceDepositAddress from "../lib/BinanceDepositAddress";
import BinanceDepositHistory from "../lib/BinanceDepositHistory";
import BinanceWalletSnap from "../lib/BinanceWalletSnap";
import EnableFastWithdraw from "../lib/EnableFastWithdraw";
import TokenAddress from "../lib/utils.js";
import "./pancake.css";
import * as solanaWeb3 from '@solana/web3.js';

const MainExchangePage = (props) => {
  const [pData, setPData] = useState(null);
  const [cData, setCData] = useState(null);
  const [calData, setCalData] = useState(null);
  const [amount, setAmount] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [inputBinance, setInputBinance] = useState(null);
  const [withdrawBinance, setWithdrawBinance] = useState(null);
  const [inputSwap, setInputSwap] = useState(null);
  const [inputRevswap, setInputRevswap] = useState(null);
  const [revData, setRevData] = useState(null);
  const [inputFund, setInputFund] = useState(null);
  const amountt = useRef("");
  const revRef = useRef("");
  const panRef = useRef("");
  const revPanRef = useRef("");
  const sendRef = useRef("");
  const withdrawRef = useRef("");
  const placeOrderRef = useRef("");
  const pancakeRouter = props.router;
  const Account = props.account;
  const splitter = (value, b) => value.substring(0, value.length - b) + " " + value.substring(value.length - b);
    
  
  const getCentralData = async () => {
    let sToken = props.pair.split(" ");
    const amount = sToken.shift();
    let quote = sToken.shift();
    let centralPrice = [];
    let pancakePrice = [];
    const burl = "https://api.binance.com";
    const endPoint = "/api/v3/ticker/price?symbol=";
    const url = burl + endPoint;
    let aQuote;
    if (quote == "WBNB") {aQuote = "BNB"} else { aQuote = quote};
    await Promise.all(sToken.map(async (token) => {
        try {
            if (token == "WBNB") {
              let pri = await Axios.get(url + "BNB" + aQuote);
            pri.data.symboll = token + " " + quote;
            centralPrice.push(pri.data);
            } else {
              let pri = await Axios.get(url + token.toUpperCase() + aQuote);
              pri.data.symboll = token + " " + quote;
              centralPrice.push(pri.data);
            }
        } catch (e) {
            console.log(e)
        }
    }))
    centralPrice.sort((a,b) => {
      if(a.symboll < b.symboll) { return -1; }
      if(a.symboll > b.symboll) { return 1; }
      return 0;
    });
    setCData(centralPrice);
    const amountIn = ethers.utils.parseUnits(amount, 18);
    await Promise.all(sToken.map(async (token) => {
        const amounts = await pancakeRouter.getAmountsOut(amountIn, [TokenAddress[quote], TokenAddress[token]]);
        const format = amounts.map(e => ethers.utils.formatUnits(e, 18));
        format.push(token + " " + quote);
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
      let pan = pancakePrice[idx][0] / pancakePrice[idx][1];
      let temp = parseFloat(num.price) / pan;
      if (temp < 1) { temp = ((1 - temp) * 100).toFixed(3)}
      else { temp = ((temp - 1) * 100).toFixed(3) }
      return {
        symbol: num.symbol,
        price: temp,
        binance: num.price,
        pancake: pan
      }
    }); 
    setCalData(result);
  }
  const binanceStateFunc = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let pair = e.target.innerText;
    let side = e.target.value;
    pair = pair.split(" ");
    let str = amountt.current.innerText;
    let strParamBinance = str + " " + side + " " + pair[0] + " " + pair[1];
    setInputBinance(c => c = strParamBinance);
    setWithdrawBinance(c => c = strParamBinance);
    setInputFund(c => c = str + " " + pair[0] + " " + pair[1]);
    console.log(strParamBinance);
    setIsSending(false);
  }, [isSending]);

  const pancakeStateFunc = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let price = e.target.innerText;
    let pair = e.target.value;
    let currentProp = props.pair.split(" ");
    let revAmount = (parseFloat(currentProp[0]/parseFloat(price))).toFixed(3);
    let swapAmount = currentProp[0];
    pair = pair.split(" ");
    let strProp = swapAmount + " " + pair[0] + " " + pair[1];
    let revStrProp = revAmount + " " + pair[1] +  " " + pair[0];
    setInputSwap(c => c = strProp);
    setInputRevswap(c => c = revStrProp);
    console.log(revAmount);
    const amountIn = ethers.utils.parseUnits(revAmount, 18);
    const amounts = await pancakeRouter.getAmountsOut(amountIn, [TokenAddress[pair[0]], TokenAddress[pair[1]]]);
    let format = amounts.map(e => ethers.utils.formatUnits(e, 18));
    format.push(pair[1] + " " + pair[0]);
    let cent = parseFloat(format[1])/parseFloat(currentProp[0]);
    if (cent < 1) { cent = ((1 - cent) * 100).toFixed(7)}
    else { cent = ((cent - 1) * 100).toFixed(7) };
    format.push(cent);
    console.log(format);
    setRevData(format);
    setIsSending(false);
  }, [isSending]);

  const PlaceOrder = useCallback(async () => {
    if (isSending) return
    setIsSending(true);
    let params = placeOrderRef.current.value;
    const res = await BinanceOrder(params);
    console.log(res);
    setIsSending(false);
  }, [isSending]);

  const  GetWithAddress = useCallback(async () => {
    if (isSending) return
    setIsSending(true);
    let address = await Account.getAddress();
    console.log(address);
    setWithdrawBinance(c => {
      if (c !== null && c.length > 0) {
        return  c + " " + address;
      }
    })
    setIsSending(false);
  }, [isSending]);

  const PlaceWithdrawal = useCallback(async () => {
    if (isSending) return
    setIsSending(true);
    let strInput = withdrawRef.current.value;
    let res = await BinanceWithdraw(strInput);
    console.log(res)
    setIsSending(false);
  }, [isSending]);

  const PanSwap = useCallback(async () => {
    if (isSending) return
    setIsSending(true);
    let strPan = panRef.current.value;
    console.log(strPan);
    const pSplit = strPan.split(" ");
    let amount = pSplit[0];
    let inToken = pSplit[1];
    let outToken = pSplit[2];
    let recipient = pSplit[3];
    const inTokenContract = new ethers.Contract(
      TokenAddress[inToken],
      [
        'function approve(address spender, uint amount) public returns(bool)',
      ],
      Account
    );
    const amountIn = ethers.utils.parseUnits(amount, 18);
    const amounts = await router.getAmountsOut(amountIn, [TokenAddress[inToken], TokenAddress[outToken]]);
    const amountOutMin = amounts[1].sub(amounts[1].div(15));
    const format = ethers.utils.formatUnits(amounts[1], 18);
    
    const tx = await router.swapExactTokensForTokens(
      amountIn,
      amountOutMin,
      [TokenAddress[inToken], TokenAddress[outToken]],
      recipient,
      Date.now() + 1000 * 60  //1 minutes
    );
    const init = async () => {
      let transac = await inTokenContract.approve(
        props.routerAddress, 
        amountIn
      );
      const approvalReceipt = await transac.wait(); 
      console.log('Approval receipt');
      console.log(approvalReceipt);
    }
    const transactionReceipt = await tx.wait(); 
    init();
    console.log('Transaction receipt');
    console.log(transactionReceipt);
    setIsSending(false);
  }, [isSending]);

  const GetReceive = useCallback(async () => {
    if (isSending) return
    setIsSending(true);
    let strPan = sendRef.current.value;
    console.log(strPan);
    strPan = strPan.split(" ");
    let coinAddress;
    if (strPan[1] == "WBNB") {
      coinAddress = await BinanceDepositAddress("BNB");
    }else {
      coinAddress = await BinanceDepositAddress(strPan[1]);
    }
    if (coinAddress == undefined) {
      console.log('api error');
    } else {
      setInputFund(c => {
        if (c !== null && c.length > 0) {
          return  c + " " + coinAddress.address;
        } else { console.log('no data from input text');}
      });
    }
    setIsSending(false);
  }, [isSending]);

  const GetReceiver = useCallback(async () => {
    if (isSending) return
    setIsSending(true);
    let strPan = panRef.current.value;
    console.log(strPan);
    strPan = strPan.split(" ");
    let coinAddress;
    if (strPan[1] == "WBNB") {
      coinAddress = await BinanceDepositAddress("BNB");
    }else {
      coinAddress = await BinanceDepositAddress(strPan[1]);
    }
    if (coinAddress == undefined) {
      console.log('api error');
    } else {
      setInputSwap(c => {
        if (c !== null && c.length > 0) {
          return  c + " " + coinAddress.address;
        } else { console.log('no data from input text');}
      });
    }
    setIsSending(false);
  }, [isSending]);

  const GetRevReceiver = useCallback(async () => {
    if (isSending) return
    setIsSending(true);
    let strPan = revPanRef.current.value;
    strPan = strPan.split(" ");
    let coinAddress;
    if (strPan[1] == "WBNB") {
      coinAddress = await BinanceDepositAddress("BNB");
    }else {
      coinAddress = await BinanceDepositAddress(strPan[1]);
    }
    if (coinAddress == undefined) {
      console.log('api error');
    } else {
      setInputRevswap(c => {
        if (c !== null && c.length > 0) {
          return  c + " " + coinAddress.address;
        } else { console.log('no data from input text');}
      });
    }
    setIsSending(false);
  }, [isSending]);

  const SendFund = useCallback(async () => {
    if (isSending) return
    setIsSending(true);
    let strInput = sendRef.current.value;
    let sendParams = strInput.split(" ");
    const qty = ethers.utils.parseUnits(sendParams[0], 18);
    let x = await Account.sendTransaction({
      to: sendParams[3],
      value: qty});
    //let format = ethers.utils.formatUnits(x, 18);
    console.log(x);
    setIsSending(false);
  }, [isSending]); 

  const GetBInfo = useCallback(async () => {
    if (isSending) return
    setIsSending(true);
    let strInput = sendRef.current.value;
    //let sendParams = strInput.split(" ");
    //let x = await BinanceCoinList();
    let x = await ExchangeInfo();
    console.log(x);
    //console.log(solanaWeb3);
    setIsSending(false);
  }, [isSending]);

  const GetWInfo = useCallback(async () => {
    if (isSending) return
    setIsSending(true);
    let address = await Account.getAddress();
    let strInput = sendRef.current.value;
    let sendParams = strInput.split(" ");
    const contract = new ethers.Contract(
      TokenAddress[sendParams[1]],
      ['function balanceOf(address owner) external view returns (uint)'],
      Account
    );
    let x = await contract.balanceOf(address);
    let format = ethers.utils.formatUnits(x, 18);
    console.log(format);
    setIsSending(false);
  }, [isSending]);


  useEffect(() => {
    getCentralData();
  }, []);
  return (
    <div>
      <p ref={amountt}>{amount}</p><span>in Amount of token</span>
      <p>
        <input ref={sendRef} type="text" className="form-control" onChange={(e) => setInputFund(e.target.value)} value={inputFund ? inputFund : " "} />
        <button className="cate" type="button" disabled={isSending} onClick={GetReceive}>Get Ad</button>
        <button className="cate" type="button" disabled={isSending}  onClick={GetWInfo}>W Info</button>
        <button className="cate" type="button" disabled={isSending} onClick={SendFund}>S Fund</button>
        <button className="cate" type="button" disabled={isSending}  onClick={GetBInfo}>B Info</button>
      </p>
      <p> Reverse Data with AMOUNT:&nbsp;<span ref={revRef}>{revData && revData[0]}</span>&nbsp;PRICE&nbsp;<span>{revData && parseFloat(revData[1]).toFixed(7)}</span>&nbsp;<span>{revData && revData[2]}</span> <span>{revData && revData[3]}%</span></p>
      <p>Pancake SELL: {pData && pData.map((a,b) => (<span key={b}><button className="cat" onClick={binanceStateFunc} value="SELL">{a[2]}</button><button value={a[2]} onClick={pancakeStateFunc}>{(parseFloat(amount)/parseFloat(a[1])).toFixed(4)}</button></span>))}</p>
      <p>Binance BUY: {cData && cData.map((a,b) => (<span key={b}><button className="cat" onClick={binanceStateFunc} value="BUY">{a.symboll}</button><button value={a.symboll} onClick={pancakeStateFunc}>{parseFloat(a.price).toFixed(4)}</button>&nbsp;&nbsp;</span>))}</p>
      <p>Binance Rate: {calData && calData.map((a,b) => (<span key={b}>{a.symboll}&nbsp;&nbsp;{a.price}%&nbsp;&nbsp;</span>))}</p>
      <p>Binance:&nbsp;&nbsp;
        <input ref={placeOrderRef} onChange={(e) => setInputBinance(e.target.value)} type="text" className="form-control" value={inputBinance ? inputBinance : " "}/>
        <button className="cate" type="button" disabled={isSending} onClick={PlaceOrder}>Bin Order</button>&nbsp;&nbsp;
        <input ref={withdrawRef} onChange={(e) => setWithdrawBinance(e.target.value)} type="text" className="form-control" value={withdrawBinance ? withdrawBinance : " "}/>
        <button className="cate" type="button" disabled={isSending} onClick={GetWithAddress}>Get Add</button>
        <button className="cate" type="button" disabled={isSending} onClick={PlaceWithdrawal}>WithDraw</button>
      </p>
      <p>Pancake Swap:&nbsp;&nbsp;
      <input ref={panRef} onChange={(e) => setInputSwap(e.target.value)} type="text" className="form-control" value={inputSwap ? inputSwap : " "}/>
      <button className="cate" type="button" disabled={isSending} onClick={GetReceiver}>GetRec</button>&nbsp;&nbsp;
      <button className="cate" type="button" disabled={isSending} onClick={PanSwap}>Swap</button>&nbsp;&nbsp;
      </p>
      <p>Pancake Swap:&nbsp;&nbsp;
      <input ref={revPanRef} onChange={(e) => setInputRevswap(e.target.value)} type="text" className="form-control" value={inputRevswap ? inputRevswap : " "}/>
      <button className="cate" type="button" disabled={isSending} onClick={GetRevReceiver}>GetRec</button>
      <button className="cate" type="button" disabled={isSending} onClick={PanSwap}>Rev Swap</button>
      </p>
    </div>
  );
};
export default MainExchangePage;