import axios from "axios";
const GetTopAccount = async (a) => {
    const pSplit = a.split(" ");
    const burl = "https://fapi.binance.com/futures/data/topLongShortAccountRatio";
    const params = "symbol=" + pSplit[0].toUpperCase() + "&period=" + pSplit[1] + "&limit=" + pSplit[2];
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

export default GetTopAccount;