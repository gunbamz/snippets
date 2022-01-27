import Axios from 'axios';
import cryptoJS from 'crypto-js';
import {aPKey, aSKey} from '../assets/env/api';

const bUrl = 'https://api.binance.com';
const endPoint = '/sapi/v1/capital/deposit/hisrec';

const BinanceDepositHistory = async (a) => {
  let coin = a;
  if (coin == 'WBNB') { coin = 'BNB' };
  let params = `coin=${coin}&network=BSC&recvWindow=20000&timestamp=${Date.now()}`;  
  let signature = cryptoJS.HmacSHA256(params, aSKey).toString(cryptoJS.enc.Hex);
  let url = bUrl + endPoint + '?' + params + '&signature=' + signature;
  try {
    let resp = await Axios.get(url, {
        headers: {
            'X-MBX-APIKEY': aPKey
        }
    });
    return resp.data;
  } catch (e) {
      console.log(e);
  }
};

export default BinanceDepositHistory;