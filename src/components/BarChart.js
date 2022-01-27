import React, { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = (props) => {
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
        },
      y1: {   
          type: 'linear',
          display: true,
          position: 'left',
        },
    },
    legend: {
        labels: {
        fontSize: 10,
        },
    },
  }
  const Chart = async () => { 
    if (props.barData == null) {}
    else {
      let labels = [...props.barData.TDtime].map(x => timo(x));
      setChartData({
        labels,
        datasets: [ 
          {
            label: 'sell vol',
            yAxisID: 'y',
            data: [...props.barData.SellVol],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'buy vol',
            yAxisID: 'y1',
            data: [...props.barData.BuyVol],
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
            borderColor: 'rgba(0, 0, 255, 1)',
            borderWidth: 1,
          }
        ],
      });
    }
  }
  useEffect(() => {
    let ignore = false;
    if (!ignore) Chart();
    return (() => { ignore = true })
  }, [props.barData]);

  return (
    <div>
      {chartData && <Bar data={chartData} height={280} width={1420} options={options} />}
    </div>
  );
};
export default BarChart;