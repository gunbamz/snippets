import Axios from 'axios';
import create from "./AxiosCreate";
import cryptoJS from 'crypto-js';
import {aPKey, aSKey} from '../assets/env/api';

const bUrl = 'http://localhost:5000/';
const endPoint = '/stream';
const Tester = async () => {
  let url = bUrl + endPoint;
  try {
    let resp = await create.get(endPoint);
    return resp.data;
  } catch (e) {
      console.log(e.response);
  }
};

export default Tester;