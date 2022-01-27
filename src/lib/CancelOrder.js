import Axios from 'axios';
import cryptoJS from 'crypto-js';
import {aPKey, aSKey} from '../assets/env/api';

const bUrl = 'https://fapi.binance.com';
const endPoint = '/fapi/v1/order';
const CancelOrder = async (a) => {
  let b = a.split(" ");
  const  timestamp = Date.now();
  let param = `symbol=${b[0]}&orderId=${b[1]}&clientOrderId=${b[2]}&recvWindow=20000&timestamp=${timestamp}`;
  let signature = cryptoJS.HmacSHA256(param, aSKey).toString(cryptoJS.enc.Hex);
  let url = bUrl + endPoint + '?' + 'signature=' + signature;
  let params = new URLSearchParams();
  params.append('symbol', b[0]);
  params.append('orderId', b[1]);
  params.append('clientOrderId', b[2]);
  params.append('recvWindow', '20000');
  params.append('timestamp', timestamp);
  try { 
      const resp = await Axios.delete(url, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-MBX-APIKEY': aPKey
        },
        data: params
      }); 
    return resp.data;
  } catch (e) {
      console.log(e.response);
  }
};
export default CancelOrder;