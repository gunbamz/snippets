import Axios from 'axios';
import cryptoJS from 'crypto-js';
import {aPKey, aSKey} from '../assets/env/api';

const bUrl = 'https://api.binance.com';
const endPoint = '/sapi/v1/accountSnapshot';
const BinanceWalletSnap = async () => {
  const  timeNow = Date.now();
  const timestamp = timeNow;
  let param = `type=SPOT&recvWindow=20000&timestamp=${timestamp}`;  
  let signature = cryptoJS.HmacSHA256(param, aSKey).toString(cryptoJS.enc.Hex);
  let url = bUrl + endPoint + '?' + param + '&signature=' + signature;
  try {
    let resp = await Axios.get(url, {
        headers: {
            'X-MBX-APIKEY': aPKey
        }
    });
    return resp.data;
  } catch (e) {
      console.log(e.response);
  }
};

export default BinanceWalletSnap;