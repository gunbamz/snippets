import Axios from 'axios';
import cryptoJS from 'crypto-js';
import {aPKey, aSKey} from '../assets/env/api';

const bUrl = 'https://api.binance.com';
const endPoint = '/sapi/v1/account/enableFastWithdrawSwitch';
const EnableFastWithdraw = async (a) => {
  let pSplit = a.split(" ");
  const  timeNow = Date.now();
  const timestamp = timeNow;
  let param = `recvWindow=20000&timestamp=${timestamp}`;  
  let signature = cryptoJS.HmacSHA256(param, aSKey).toString(cryptoJS.enc.Hex);
  let url = bUrl + endPoint + '?' + 'signature=' + signature;
  let params = new URLSearchParams();
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

export default EnableFastWithdraw;