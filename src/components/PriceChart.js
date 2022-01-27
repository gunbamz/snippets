import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
ChartJS.register(CategoryScale, LineElement, PointElement, LinearScale, Title, Tooltip, Legend);


const PriceChart = React.memo((props) => {
  const [chartData, setChartData] = useState(null);
  const [caves, setCave] = useState([]);
  const [trades, setTrade] = useState([]);
  const [timeStamps, setTimeStamp] = useState([]);
  const timo = (a) => { 
    const b = new Date(a);
    return  b.getHours() + ":" + b.getMinutes();
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {   
          type: 'linear',
          display: true,
          position: 'left',
          beginAtZero: false,
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
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: false,
      }
    },
    };

  const Charta = async () => {
    if (props.batch == null) {} 
    else {
      let Cdata = [...props.batch];
      let Cave = Cdata.map(x => (parseFloat(x[1]) + parseFloat(x[2]) + parseFloat(x[3]) + parseFloat(x[4])) * 0.25 );
      let Ctrade = Cdata.map(x => parseFloat(x[8]));
      const labels = Cdata.map(x => timo(x[0]));
      setChartData({
        labels,
        datasets: [ 
          {
            label: 'Ave P',
            data: Cave,
            yAxisID: 'y',
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)',
            tension: 0,
            borderWidth: 1
          },
          {
            label: 'Trade N',
            data: Ctrade,
            yAxisID: 'y1',
            fill: false,
            borderColor: 'rgba(20, 99, 132, 1)',
            tension: 0,
            borderWidth: 1
          }
        ],
      });
      setCave(e => e = Cave);
      setTrade(e => e = Ctrade);
      setTimeStamp(e => e = labels);
    }
  };

  const Chart = async () => {
    if (props.kline == null) {} 
    else {
      let Kline = [...props.kline];
      let ave = (parseFloat(Kline[1]) + parseFloat(Kline[2]) + parseFloat(Kline[3]) + parseFloat(Kline[4])) * 0.25;
      let Cave = [...caves, ave];
      let Ctrade = [...trades, parseFloat(Kline[8])];
      let labels = [...timeStamps, timo(Kline[0])];
      setChartData({
        labels,
        datasets: [ 
          {
            label: 'Ave P',
            data: Cave,
            yAxisID: 'A',
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)',
            tension: 0,
            borderWidth: 1
          },
          {
            label: 'Trade N',
            data: Ctrade,
            yAxisID: 'B',
            fill: false,
            borderColor: 'rgba(20, 99, 132, 1)',
            tension: 0,
            borderWidth: 1
          }
        ],
      });
      Cave.shift();
      Ctrade.shift();
      labels.shift();
      setCave(Cave);
      setTrade(Ctrade);
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
          {chartData && <Line options={options} data={chartData}  height={246} width={1380} />}
        </div>
       );
});
export default PriceChart;