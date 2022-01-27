import Axios from 'axios';
import cryptoJS from 'crypto-js';
import {aPKey, aSKey} from '../assets/env/api';

const bUrl = 'https://api.binance.com';
const endPoint = '/api/v3/order'; 
const BinanceSpotMOrder = async (a) => {
  let b = a.split(" ");
  const  timestamp = Date.now();
  let param = `symbol=${b[2]}&side=${b[1]}&type=${b[4]}&quantity=${b[3]}&recvWindow=20000&timestamp=${timestamp}`;
  let signature = cryptoJS.HmacSHA256(param, aSKey).toString(cryptoJS.enc.Hex);
  let url = bUrl + endPoint + '?' + 'signature=' + signature;
  let params = new URLSearchParams();
  params.append('symbol', b[2]);
  params.append('side', b[1]);
  params.append('type', b[4]);
  params.append('quantity', b[3]);
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
export default BinanceSpotMOrder;