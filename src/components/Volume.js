import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
ChartJS.register(CategoryScale, LineElement, PointElement, LinearScale, Title, Tooltip, Legend);

const Volume = (props) => {
  const [volData, setVolData] = useState(null);
  const [gVols, setGVol] = useState([]);
  const [tVols, setTVol] = useState([]);
  const [timeStamps, setTimeStamp] = useState([]);

  const timo = (a) => { 
    const b = new Date(a);
    return  b.getHours() + ":" + b.getMinutes();
  };
  const option = {
    maintainAspectRatio: false,
    scales: {
      y: {   
          type: 'linear',
          display: true,
          position: 'left',
          beginAtZero: true,
        },
      y1: {   
          type: 'linear',
          display: true,
          position: 'left',
          beginAtZero: true,
        },
    },
    legend: {
        labels: {
        fontSize: 10,
        },
    },
  }
  const Charta = async () => {
    const Cdata = props.batch;
    if (Cdata == null) {} 
    else {
      let gVol = Cdata.map(x => parseFloat(x[5]));
      let tVol = Cdata.map(x => parseFloat(x[9]));
      const labels = Cdata.map(x => timo(x[0]));
      setVolData({
        labels,
        datasets: [ 
          {
            label: 'G Vol',
            data: gVol,
            yAxisID: 'y',
            fill: false,
            borderColor: 'rgba(20, 99, 132, 1)',
            tension: 0,
            borderWidth: 1
          },
          {
            label: 'TBuy Vol',
            data: tVol,
            yAxisID: 'y1',
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)',
            tension: 0,
            borderWidth: 1
          }
        ],
      });
      setGVol(e => e = gVol);
      setTVol(e => e = tVol);
      setTimeStamp(e => e = labels);
    }
  };

  const Chart = async () => {
    const Kline = props.kline;
    if (Kline == null) {} 
    else {
      let gVol = [...gVols, parseFloat(Kline[5])];
      let tVol = [...tVols, parseFloat(Kline[9])];
      let labels = [...timeStamps, timo(Kline[0])];
      setVolData({
        labels,
        datasets: [ 
          {
            label: 'G Vol',
            data: gVol,
            yAxisID: 'A',
            fill: false,
            borderColor: 'rgba(20, 99, 132, 1)',
            tension: 0,
            borderWidth: 1
          },
          {
            label: 'TBuy Vol',
            data: tVol,
            yAxisID: 'B',
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)',
            tension: 0,
            borderWidth: 1
          }
        ],
      });
      gVol.shift();
      tVol.shift();
      labels.shift();
      setGVol(gVol);
      setTVol(tVol);
      setTimeStamp(labels);
    }
  };
  useEffect(() => {
    Charta();
  }, [props.batch]);

  useEffect(() => {
    Chart();
  }, [props.kline]);

  return (
    <div>
      {volData && <Line data={volData} height={246} width={1380} options={option} />}
  </div>
  );
};
export default Volume;