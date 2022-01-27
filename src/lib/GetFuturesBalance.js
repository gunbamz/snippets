import Axios from 'axios';
import cryptoJS from 'crypto-js';
import {aPKey, aSKey} from '../assets/env/api';

const bUrl = 'https://fapi.binance.com';
const endPoint = '/fapi/v1/order';
const GetFuturesBalance = async (a) => {
  let pSplit = a.split(" ");
  let symbol = pSplit[2] + pSplit[3];
  const  timeNow = Date.now(); 
  const timestamp = timeNow;
  let param = `symbol=${symbol}&side=${pSplit[1]}&type=MARKET&quoteOrderQty=${pSplit[0]}&recvWindow=20000&timestamp=${timestamp}`;
  let signature = cryptoJS.HmacSHA256(param, aSKey).toString(cryptoJS.enc.Hex);
  let url = bUrl + endPoint + '?' + 'signature=' + signature;
  let params = new URLSearchParams();
  params.append('symbol', symbol);
  params.append('side', pSplit[1]);
  params.append('type', 'MARKET');
  params.append('quoteOrderQty', pSplit[0]);
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
export default GetFuturesBalance;