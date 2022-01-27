import React, { useState, useEffect, useCallback, useRef } from "react";
import * as ethers from "ethers";
import Axios from "axios";
import BinanceWithdraw from "../lib/BinanceWithdraw";
import BinanceOrder from "../lib/BinanceOrder";
import BinanceCoinList from "../lib/BinanceCoinList";
import BinanceDepositAddress from "../lib/BinanceDepositAddress";
import BinanceDepositHistory from "../lib/BinanceDepositHistory";
import BinanceWalletSnap from "../lib/BinanceWalletSnap";
import EnableFastWithdraw from "../lib/EnableFastWithdraw";
import TokenAddress from "../lib/utils.js";
import "./pancake.css";

const MainExchangePage = (props) => {
  const [isSending, setIsSending] = useState(false);
  const [inputFund, setInputFund] = useState(null);
  const sendRef = useRef("");
  const Account = props.account;
  const splitter = (value, b) => value.substring(0, value.length - b) + " " + value.substring(value.length - b);
    

  const GetWInfo = useCallback(async () => {
    if (isSending) return
    setIsSending(true);
    let x = await Account.getBalance('HCnCoHgJxDuN3xKh24GCDXZUtC7hzaRTC668SABfNV4U');
    console.log(x);
    setIsSending(false);
  }, [isSending]);


  useEffect(() => {
    getCentralData();
  }, []);
  return (
    <div>
      <p>
        <input ref={sendRef} type="text" className="form-control" onChange={(e) => setInputFund(e.target.value)} value={inputFund ? inputFund : " "} />
        <button className="cate" type="button" disabled={isSending}  onClick={GetWInfo}>W Info</button>
      </p>
    </div>
  );
};
export default MainExchangePage;