import React, { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';

const Visualize = () => {
  const [barData, setBarData] = useState({});
  const timo = (a) => { 
    const b = new Date(a);
    return  b.getHours() + ":" + b.getMinutes();
  };
  const Charta = async () => {
    const Adata = JSON.parse(localStorage.getItem("Adata"));
    const takerBP = Adata.map(x => parseFloat(x.takerBP));
    const takerBV = Adata.map(x => parseFloat(x.takerBV));
    const takerBVn = Adata.map(x => parseFloat(x.takerBVn));
    const aTimeStamp = Adata.map(x => timo(x.time));
    setBarData({
      labels: aTimeStamp,
      datasets: [ 
        {
        label: 'Taker V1',
          data: takerBP,
          backgroundColor: 'rgba(113, 124, 244, 1)',
          borderColor: 'rgba(113, 124, 244, 1)',
          borderWidth: 1,
        },
        {
          label: 'Taker V2',
          data: takerBV,
          backgroundColor: 'rgba(15, 9, 134, 1)',
          borderColor: 'rgba(15, 9, 134, 1)',
          borderWidth: 1,
        },
        {
            label: 'Taker V3',
            data: takerBVn,
            backgroundColor: 'rgba(7, 3, 140, 1)',
            borderColor: 'rgba(7, 3, 140, 1)',
            borderWidth: 1,
          }
      ],
    });
  };
  useEffect(() => {
    let timer = setTimeout(()=> Charta(), 3100);
    return () => {
      clearTimeout(timer);
    }
  }, []);
  return (
    <div>
      <Bar
        data={barData}
        height={246}
        width={340}
        options={{
        maintainAspectRatio: false,
        scales: {
            yAxes: [
            {
                ticks: {
                beginAtZero: true,
                },
            },
            { 
                ticks: {
                beginAtZero: true,
                },
            }
            ],
        },
        legend: {
            labels: {
            fontSize: 10,
            },
        },
        }}
    />
  </div>
  );
};
export default Visualize;