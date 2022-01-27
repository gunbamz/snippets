import React from 'react';
import { useEffect, useState } from 'react';
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Tooltip
} from 'recharts';

const MarkPrice = (props) => {
  const [data, setData] = useState([]);

  const connect = () => {
    const baseURL = "wss://fstream.binance.com";
    const pair = props.pair.split(" ")[0].toLowerCase();
    const streamm = "/ws/" + pair + "@markPrice";
    const bsoc = new WebSocket(baseURL + streamm);

    bsoc.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log(message);
        setData(currentData => [...currentData, message]);
    };
    bsoc.onclose = (e) => {
      console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
      setTimeout(() => {
      connect();
      }, 3000);
    };
    bsoc.onerror = (err) => {
      console.error('My Socket encountered error: ', err.message, 'Closing socket');
      bsoc.close();
    };
  };
  // 1. listen for a cpu event and update the state
  useEffect(() => {
    connect();
  }, []);
  // 2. render the line chart using the state
  return (
    <div>
      <h1>MarkPrice</h1>
      <LineChart width={700} height={226} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="E" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="p" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="i" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default MarkPrice;