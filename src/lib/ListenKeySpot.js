import Axios from 'axios';
import {aPKeyy, aSKeyy} from '../assets/env/api';

const apiAdd =  'https://api.binance.com/api/v3/userDataStream'; 

const getListenKeys = async () => {
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
const keepAlives = async (a) => {
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
const closeStreams = async () => {
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

export { getListenKeys, keepAlives, closeStreams };