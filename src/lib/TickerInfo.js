import Axios from 'axios';

const burl = ' https://fapi.binance.com';
const endPoint = '/fapi/v1/ticker/24hr';
const url = burl + endPoint;

const TickerInfo = async () => {
    try {
        const resp = await Axios.get(url);
        return resp.data;
    } catch (e) {
        console.log(e.response);
    }
}

export default TickerInfo;