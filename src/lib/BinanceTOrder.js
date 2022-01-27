import Axios from 'axios';
import cryptoJS from 'crypto-js';
import {aPKey, aSKey} from '../assets/env/api';

const bUrl = 'https://fapi.binance.com';
const endPoint = '/fapi/v1/order'; 
const BinanceTOrder = async (a) => {
  let b = a.split(" ");
  const  timestamp = Date.now();
  let param = `symbol=${b[3]}&side=${b[1]}&positionSide=${b[2]}&type=MARKET&quantity=${b[4]}&recvWindow=20000&timestamp=${timestamp}`;
  let signature = cryptoJS.HmacSHA256(param, aSKey).toString(cryptoJS.enc.Hex);
  let url = bUrl + endPoint + '?' + 'signature=' + signature;
  let params = new URLSearchParams();
  params.append('symbol', b[3]);
  params.append('side', b[1]);
  params.append('positionSide', b[2]);
  params.append('type', 'MARKET');
  params.append('quantity', b[4]);
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
export default BinanceTOrder;