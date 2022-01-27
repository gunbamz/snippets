import Axios from 'axios';

const TickerPrice = async (a) => {
    let sToken = a.split(" ");
    const amount = sToken.shift();
    let quote = sToken.shift();
    let prices = [];
    if (quote == 'WBNB') { quote = 'BNB' };
    const burl = 'https://api.binance.com';
    const endPoint = '/api/v3/ticker/price?symbol=';
    const url = burl + endPoint;
    await Promise.all(sToken.map(async (token) => {
        try {
            const pri = await Axios.get(url + token.toUpperCase() + quote)
            prices.push(pri.data);
        } catch (e) {
            console.log(e.response)
        }
    }))
    return prices;
}
export default TickerPrice;