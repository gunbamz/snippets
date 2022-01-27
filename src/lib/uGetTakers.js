import axios from "axios";
const burl = "https://fapi.binance.com/futures/data/takerlongshortRatio";
const uGetTakers = async (a) => {
    const pSplit = a.split(" ");
    const params = "symbol=" + pSplit[0].toUpperCase() + "&period=" + pSplit[1] + "&limit=1";
    const url = burl + '?' + params;
    if ( pSplit.length > 2 ) {
        try {
            const resp = await axios.get(url);
            return resp.data;
        } catch (e) {
            console.log(e);
        }    
    } else {
        console.log("request parameter not complete");
    }
}

export default uGetTakers;