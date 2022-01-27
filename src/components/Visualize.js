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
    const margin = Adata.map(x => parseFloat(x.margin));
    const nxMargin = Adata.map(x => parseFloat(x.nxMargin));
    console.log(margin, nxMargin);
    const aTimeStamp = Adata.map(x => timo(x.time));
    setBarData({
      labels: aTimeStamp,
      datasets: [ 
        {
        label: 'Margin 1',
          data: margin,
          backgroundColor: 'rgba(40, 131, 12, 1)',
          borderColor: 'rgba(226, 252, 218, 1)',
          borderWidth: 1,
        },
        {
          label: 'Margin 2',
          data: nxMargin,
          backgroundColor: 'rgba(128, 212, 37, 0.9)',
          borderColor: 'rgba(205, 240, 168, 0.9)',
          borderWidth: 1,
        }
      ],
    });
  };
  useEffect(() => {
    let timer = setTimeout(()=> Charta(), 3000);
    return () => {
      clearTimeout(timer);
    }
  }, []);
  return (
    <div>
      <Bar
        data={barData}
        height={246}
        width={700}
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