import Axios from 'axios';

const burl = ' https://api.binance.com';
const endPoint = '/api/v3/ticker/24hr';
const url = burl + endPoint;

const TickerInfoSpot = async () => {
    try {
        const resp = await Axios.get(url);
        return resp.data;
    } catch (e) {
        console.log(e.response);
    }
}

export default TickerInfoSpot;