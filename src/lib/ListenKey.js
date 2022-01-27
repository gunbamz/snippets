import Axios from 'axios';
import {aPKeyy, aSKeyy} from '../assets/env/api';

const apiAdd =  'https://fapi.binance.com/fapi/v1/listenKey'; 

const getListenKey = async () => {
    try {
        const resp = await Axios({
            method: 'post',
            url: apiAdd,
            headers: {'X-MBX-APIKEY': aPKeyy},
            auth: {
                APIKEY: aPKeyy,
                SECRET:aSKeyy
            }
        });
        return resp.data
    } catch (e) {
        console.log(e.response);
    }
};
const keepAlive = async () => {
    try {
        const resp = await Axios({
            method: 'put',
            url: apiAdd,
            headers: {'X-MBX-APIKEY': aPKeyy},
            auth: {
                APIKEY: aPKeyy,
                SECRET:aSKeyy
            }
        });
        return resp.data
    } catch (e) {
        console.log(e.response);
    }
};
const closeStream = async () => {
    try {
        const resp = await Axios({
            method: 'delete',
            url: apiAdd,
            headers: {'X-MBX-APIKEY': aPKeyy},
            auth: {
                APIKEY: aPKeyy,
                SECRET:aSKeyy
            }
        });
        return resp.data
    } catch (e) {
        console.log(e.response);
    }
};

export { getListenKey, keepAlive, closeStream };