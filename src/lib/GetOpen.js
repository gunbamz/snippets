import axios from "axios";
const GetOpen = async (a) => {
    const pSplit = a.split(" ");
    const burl = "https://fapi.binance.com/futures/data/openInterestHist";
    const params = "symbol=" + pSplit[0].toUpperCase() + "&period=" + pSplit[1] + "&limit=" + pSplit[2];
    const url = burl + '?' + params;
    if ( pSplit.length > 2 ) {
        try {
            const resp = await axios.get(url);
            return resp.data;
        } catch (e) {
            console.log(e.responsee);
        }    
    } else {
        console.log("request parameter not complete");
    }
}

export default GetOpen;