import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
ChartJS.register(CategoryScale, LineElement, PointElement, LinearScale, Title, Tooltip, Legend);

const GLineChart = (props) => {
  const [chartData, setChartData] = useState(null);
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
          beginAtZero: false,
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
  }
  
  const Chart = () => {
    if (props.glineData == null) {} 
    else {
      let labels = [...props.glineData.GDtime].map(x => timo(x));
      setChartData({
        labels,
        datasets: [ 
          {
            label: 'Global',
            data:  [...props.glineData.GRatio],
            yAxisID: 'y',
            fill: false,
            borderColor: 'rgba(20, 99, 132, 1)',
            tension: 0,
            borderWidth: 1,
          },
          {
            label: 'Open Int',
            data: [...props.glineData.OpenInt],
            yAxisID: 'y1',
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)',
            tension: 0,
            borderWidth: 1,
          }
        ],
      });
    }
  };
  useEffect(() => {
    let ignore = false;
    if (!ignore) Chart();
    return (() => { ignore = true })
  }, [props.glineData]);

  return (
    <div>
      {chartData && <Line data={chartData} height={280} width={1380} options={options} />}
  </div>
  );
};
export default GLineChart;