import Axios from 'axios';
import cryptoJS from 'crypto-js';

const aPKey = '552v8BTxJkn6odElKry79BS3R0j4Ighbuy9X1RqzkM8JUnPURbSYktLvyb9SEyJJ';
const aSKey = '0meANlIvFjwJ9w1XNuLK6DE78cbM3dz8ej995fXiTRy4fi4cn6jpGb6oT5xPRujG'; 
const bUrl = 'https://api.binance.com';
const endPoint = '/sapi/v1/capital/config/getall';

const BinanceCoinList = async () => {
  let params = `recvWindow=20000&timestamp=${Date.now()}`;  
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

export default BinanceCoinList;