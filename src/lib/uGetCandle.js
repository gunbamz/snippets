import axios from "axios";
const uGetCandle = async (a) => {
    const pSplit = a.split(" ");
    const burl = "https://fapi.binance.com/fapi/v1/continuousKlines";
    const params = "pair=" + pSplit[0].toUpperCase() + "&contractType=PERPETUAL&interval=" + pSplit[1] + "&limit=1";
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

export default uGetCandle;