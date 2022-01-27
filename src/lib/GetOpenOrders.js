import Axios from 'axios';
import cryptoJS from 'crypto-js';
import {aPKey, aSKey} from '../assets/env/api';

const bUrl = 'https://fapi.binance.com';
const endPoint = '/fapi/v1/openOrders';

const GetOpenOrders = async (a) => {
    let params = `symbol=${a}&recvWindow=20000&timestamp=${Date.now()}`;  
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
        console.log(e.response);
    }
}

export default GetOpenOrders;