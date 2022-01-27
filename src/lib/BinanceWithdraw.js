import Axios from 'axios';
import cryptoJS from 'crypto-js';
import {aPKey, aSKey} from '../assets/env/api';

const bUrl = 'https://api.binance.com';
const endPoint = '/sapi/v1/capital/withdraw/apply';
const BinanceWithdraw = async (a) => {
  let pSplit = a.split(" ");
  const  timeNow = Date.now();
  const timestamp = timeNow;
  let param = `coin=${pSplit[2]}&network=BSC&amount=${pSplit[0]}&address=${pSplit[4]}&recvWindow=20000&timestamp=${timestamp}`;  
  let signature = cryptoJS.HmacSHA256(param, aSKey).toString(cryptoJS.enc.Hex);
  let url = bUrl + endPoint + '?' + 'signature=' + signature;
  let params = new URLSearchParams();
  params.append('coin', pSplit[2]);
  params.append('network', 'BSC');
  params.append('amount', pSplit[0]);
  params.append('address', pSplit[4]);
  params.append('recvWindow', '20000');
  params.append('timestamp', timestamp);
  try {
    const resp = await Axios.post(url, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-MBX-APIKEY': aPKey
      }
    });
    return resp.data;
  } catch (e) {
      console.log(e.response);
  }
};

export default BinanceWithdraw;