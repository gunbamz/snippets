import { createChart } from "lightweight-charts";
import React, { useState, useEffect, useRef } from "react";
const  MarkPricee = (props) => {
  const chartRef = useRef(null);
  const prepareChart = () => {
    if(chartRef.current){
      const chart = createChart(chartRef.current, {
        width: 700,
        height: 246,
        crosshair: {
          mode: "normal"
        },
        layout: {
          backgroundColor: '#ffffff',
          textColor: 'rgba(255, 255, 255, 0.9)',
        },
        grid: {
          vertLines: {
            color: 'rgba(197, 203, 206, 0.5)',
          },
          horzLines: {
            color: 'rgba(197, 203, 206, 0.5)',
          },
        },
        priceScale: {
          borderColor: 'rgba(197, 203, 206, 0.8)',
        },
        timeScale: {
          borderColor: 'rgba(197, 203, 206, 0.8)',
          visible: true,
          timeVisible: true,
          secondsVisible: false,
          fixRightEdge: true,
          borderVisible: true,
          rightBarStayOnScroll: true,
        }
      });
      const markSeries = chart.addLineSeries({ color: '#034b03', lineWidth: 1 });
      const indexSeries = chart.addLineSeries({ color: '#ff0000', lineWidth: 1 });
      const connect = () => {
        const baseURL = "wss://fstream.binance.com";
        const pair = props.pair.split(" ")[0].toLowerCase();
        const streamm = "/ws/" + pair + "@markPrice";
        const bsoc = new WebSocket(baseURL + streamm);

        bsoc.onmessage = (event) => {	
          const lineData = JSON.parse(event.data);
          markSeries.update({
            time: (lineData.E / 1000) + 3600,
            value: lineData.p, 
          });
          indexSeries.update({
            time: (lineData.E / 1000) + 3600,
            value: lineData.i, 
          })
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
      connect();
    } 
  }
  useEffect(() => {
    let timer = setTimeout(()=> prepareChart(), 1100);
    return () => {
      clearTimeout(timer);
    }
  }, []);
  return <div ref={chartRef} />;  
}
export default MarkPricee;
