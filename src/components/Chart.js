import React, { useState, useEffect } from "react";
import { Line, Bar } from 'react-chartjs-2';
import GetCandle from '../lib/GetCandle';
import Analysiss from '../lib/Analysiss';


const Chart = (props) => {
  const [lineData, setLineData] = useState({});
  let Cave = [];
  let Ctrade = [];
  let TimeStamp = [];
  const timo = (a) => { 
    const b = new Date(a);
    return  b.getHours() + ":" + b.getMinutes();
  };

  const Charta = async () => {
    const Cdata = await GetCandle( props.pair);
    Cave = Cdata.map(x => (parseFloat(x[1]) + parseFloat(x[2]) + parseFloat(x[3]) + parseFloat(x[4])) * 0.25 );
    Ctrade = Cdata.map(x => parseFloat(x[8]));
    TimeStamp = Cdata.map(x => timo(x[0]));
    localStorage.setItem("Cdata", JSON.stringify(Cdata));
    setLineData({
      labels: TimeStamp,
      datasets: [ 
        {
          label: 'Ave P',
          data: Cave,
          yAxisID: 'A',
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0,
        },
        {
          label: 'Trade N',
          data: Ctrade,
          yAxisID: 'B',
          fill: false,
          borderColor: 'rgba(20, 99, 132, 1)',
          tension: 0,
        }
      ],
    });
  };
  useEffect(() => {
    Charta();
  }, []);
  return (
    <div>
      <Line
          data={lineData}
          height={246}
          width={1200}
          options={{
          maintainAspectRatio: false,
          scales: {
              yAxes: [
              {   id: 'A',
                  type: 'linear',
                  position: 'left',
                  ticks: {
                  beginAtZero: false,
                  },
              }, 
              {
                id: 'B',
                type: 'linear',
                position: 'right',
                ticks: {
                  beginAtZero: false,
                }
              }
              ],
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
          }}
      />
  </div>
  );
};
export default Chart;