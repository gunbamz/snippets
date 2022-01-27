import Axios from 'axios';
import cryptoJS from 'crypto-js';
import {aPKeyy, aSKeyy} from '../assets/env/api';
const bUrl = 'https://fapi.binance.com';
const endPoint = '/fapi/v2/account';

const GetPosition = async () => {
    let params = `recvWindow=20000&timestamp=${Date.now()}`;  
    let signature = cryptoJS.HmacSHA256(params, aSKeyy).toString(cryptoJS.enc.Hex);
    let url = bUrl + endPoint + '?' + params + '&signature=' + signature;
    try {
        let resp = await Axios.get(url, {
            headers: {
                'X-MBX-APIKEY': aPKeyy
            }
        });
        return resp.data;
    } catch (e) {
        console.log(e.response);
    }
}

export default GetPosition;