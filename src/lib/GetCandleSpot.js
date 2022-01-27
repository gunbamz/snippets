import axios from "axios";
const GetCandleSpot = async (a) => {
    const pSplit = a.split(" ");
    const burl = "https://api.binance.com/api/v3/klines";
    const params = "symbol=" + pSplit[0].toUpperCase() + "&interval=" + pSplit[1] + "&limit=" + pSplit[2];
    const url = burl + '?' + params;

    if ( pSplit.length > 2 ) {
        try {
            const resp = await axios.get(url);
            return resp.data;
        } catch (e) {
            console.log(e.response);
        }    
    } else {
        console.log("request parameter not complete");
    }
}

export default GetCandleSpot;