import Axios from 'axios';
import cryptoJS from 'crypto-js';
import {aPKey, aSKey} from '../assets/env/api';

const bUrl = 'https://api.binance.com';
const endPoint = '/api/v3/order';
const BinanceSpotOrder = async (a) => {
  let b = a.split(" ");
  const  timestamp = Date.now();
  let param = `symbol=${b[3]}&side=${b[1]}&type=${b[2]}&quantity=${b[5]}&price=${b[4]}&stopPrice=${b[0]}&timeInForce=${b[6]}&recvWindow=20000&timestamp=${timestamp}`;
  let signature = cryptoJS.HmacSHA256(param, aSKey).toString(cryptoJS.enc.Hex);
  let url = bUrl + endPoint + '?' + 'signature=' + signature;
  let params = new URLSearchParams();
  params.append('symbol', b[3]);
  params.append('side', b[1]);
  params.append('type', b[2]);
  params.append('quantity', b[5]);
  params.append('price', b[4]);
  params.append('stopPrice', b[0]);
  params.append('timeInForce', b[6]);
  params.append('recvWindow', '20000');
  params.append('timestamp', timestamp);
  console.log(b);
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
export default BinanceSpotOrder;