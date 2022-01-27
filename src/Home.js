import React, { useState, useEffect, useCallback, useRef, useContext } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
//import { TwitterApi } from 'twitter-api-v2';
import ExchangeInfo from "./lib/ExchangeInfo";
import Context from "./Context";
import ExchangeInfoSpot from "./lib/ExchangeInfoSpot";
import "./Home.css";
import ChangeLeverage from "./lib/ChangeLeverage";
import TickerInfo from "./lib/TickerInfo";
import GetUserTweets from "./lib/GetUserTweets";
import Tester from "./lib/Tester";
import TickerInfoSpot from "./lib/TickerInfoSpot";

const Home = () => {
  const [input, setInput] = useState("BTCUSDT 2 10");
  const [strInfo, setStrInfo] = useState("");
  const [leverage, setLeverage] = useState("");
  const [sortParam, setSortParam] = useState("USDT quoteVolume 10");
  const [tickers, setTickers] = useState(null);
  const [tickerSpot, setTickerSpot] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const location = useLocation();
  let inputRef = useRef();
  const {setValue} = useContext(Context);
  //const client = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAELQXgEAAAAAIRRjbppBWpllv4S3nn%2BYFqMlzAQ%3DkYo3lT3G6UAylF3hJJeD3yxoz3TcElozx4DsJ2yoMHHDcx9cI8');
  

  const getFutures = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
     let res = await ExchangeInfo();
     if (res == undefined) {
      console.log('api error');
    }
    else {
      localStorage.setItem("exchangeinfo", JSON.stringify(res));
      let valArr = e.target.value.split(" ");
      let targetProp =  res.symbols.filter((x) => x.symbol == valArr[0]);
      let priceFilt = targetProp[0].filters.filter((x) => x.filterType == "PRICE_FILTER");
      let lotSizeFilt = targetProp[0].filters.filter((x) => x.filterType == "LOT_SIZE");
      let temp = targetProp[0].pricePrecision + " " + priceFilt[0].tickSize + " " + targetProp[0].quantityPrecision + " " + lotSizeFilt[0].stepSize + " 1";
      setStrInfo(temp);
      setValue(valArr[0] + " 1m 50 1.0020 " + valArr[1] + " " + valArr[2] + " " + temp + " STOP GTC FALSE 4");
    }
    setIsSending(false);
  }, [isSending]);

  const getTwitter = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let res = await Tester();
    if (res == undefined) {
      console.log('api error');
    } else {
      console.log(res);
    }
    // const jsTweets = await client.v2.search('JavaScript', { 'media.fields': 'url' });
    //  if (jsTweets == undefined) {
    //   console.log('api error');
    // }
    // else {
    //   for await (const tweet of jsTweets) {
    //     console.log(tweet);
    //   }
    // }
    setIsSending(false);
  }, [isSending]);

  const getTweets = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    const jsTweets = await GetUserTweets();
     if (jsTweets == undefined) {
      console.log('api error');
    }
    else {
      for await (const tweet of jsTweets) {
        console.log(tweet);
      }
    }
    setIsSending(false);
  }, [isSending]);

  const getFutureCache = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let res = await JSON.parse(localStorage.getItem("exchangeinfo"));
     if (res == undefined) {
      console.log('api error');
    }
    else {
      let valArr = e.target.value.split(" ");
      let targetProp =  res.symbols.filter((x) => x.symbol == valArr[0]);
      let priceFilt = targetProp[0].filters.filter((x) => x.filterType == "PRICE_FILTER");
      let lotSizeFilt = targetProp[0].filters.filter((x) => x.filterType == "LOT_SIZE");
      let temp = targetProp[0].pricePrecision + " " + priceFilt[0].tickSize + " " + targetProp[0].quantityPrecision + " " + lotSizeFilt[0].stepSize + " 1" ;
      setStrInfo(temp);
      setValue(valArr[0] + " 1m 50 1.0020 " + valArr[1] + " " + valArr[2] + " " + temp + " STOP GTC FALSE 4");
    }
    setIsSending(false);
  }, [isSending]);

  const getSpot = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let target = inputRef.current.value.toUpperCase();
    let res = await ExchangeInfoSpot();
    if (res == undefined) {
      console.log('api error');
    }
    else {
      localStorage.setItem("exchangeinfospot", JSON.stringify(res));
      let valArr = e.target.value.split(" ");
      let targetProp =  res.symbols.filter((x) => x.symbol == valArr[0]);
      let priceFilt = targetProp[0].filters.filter((x) => x.filterType == "PRICE_FILTER");
      let lotSizeFilt = targetProp[0].filters.filter((x) => x.filterType == "LOT_SIZE");
      let temp = targetProp[0].quotePrecision + " " + targetProp[0].quoteAssetPrecision + " " + priceFilt[0].tickSize + " " + lotSizeFilt[0].stepSize  + " " + lotSizeFilt[0].minQty;
      setStrInfo(temp);
      setValue(valArr[0] + " 1m 50 1.0020 " + valArr[1] + " " + valArr[2] + " " + temp + " STOP GTC FALSE 4");
    }
    setIsSending(false);
  }, [isSending]);

  const getSpotCache = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let target = inputRef.current.value.toUpperCase();
    let res = await JSON.parse(localStorage.getItem("exchangeinfospot"));
    if (res == undefined) {
      console.log('api error');
    }
    else {
      let valArr = e.target.value.split(" ");
      let targetProp =  res.symbols.filter((x) => x.symbol == valArr[0]);
      let priceFilt = targetProp[0].filters.filter((x) => x.filterType == "PRICE_FILTER");
      let lotSizeFilt = targetProp[0].filters.filter((x) => x.filterType == "LOT_SIZE");
      let temp = targetProp[0].quotePrecision + " " + targetProp[0].quoteAssetPrecision + " " + priceFilt[0].tickSize + " " + lotSizeFilt[0].stepSize  + " " + lotSizeFilt[0].minQty;
      setStrInfo(temp);
      setValue(valArr[0] + " 1m 50 1.0020 " + valArr[1] + " " + valArr[2] + " " + temp + " STOP GTC FALSE 4");
    }
    setIsSending(false);
  }, [isSending]);

  const changeLeverage = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let res = await ChangeLeverage(e.target.value);
    if (res == undefined) {
      console.log('api error');
    }
    else {
      setLeverage(res.leverage + " " + "SUCCESS");
    }
    setIsSending(false);
  }, [isSending]);

  const GetTickers = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let res = await TickerInfo();
    if (res == undefined) {
      console.log('api error');
    }
    else {
      localStorage.setItem("tickers", JSON.stringify(res));
      let param = e.target.value.split(" ");
      let market = res.filter(x => x.symbol.includes(param[0]))
      market.sort(function(a, b) { return b[param[1]] - a[param[1]] })
      let subset = market.slice(0, param[2] )
      setTickers(subset);
    }
    setIsSending(false);
  }, [isSending]);

  const GetTickerSpot = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let res = await TickerInfoSpot();
    if (res == undefined) {
      console.log('api error');
    }
    else {
      localStorage.setItem("tickerspot", JSON.stringify(res));
      let param = e.target.value.split(" ");
      let market = res.filter(x => x.symbol.includes(param[0]))
      market.sort(function(a, b) { return b[param[1]] - a[param[1]] })
      let subset = market.slice(0, param[2] )
      setTickerSpot(subset);
      //localStorage.setItem("tickers", JSON.stringify(res));
    }
    setIsSending(false);
  }, [isSending]);

  const GetCache = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let res = await JSON.parse(localStorage.getItem("tickers"));
    if (res == undefined) {
      console.log('local storage error');
    }
    else {
      let param = e.target.value.split(" ");
      let market = res.filter(x => x.symbol.includes(param[0]))
      market.sort(function(a, b) { return b[param[1]] - a[param[1]] })
      let subset = market.slice(0, param[2] )
      setTickers(subset);
    }
    setIsSending(false);
  }, [isSending]);

  const GetCacheSpot = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let res = await JSON.parse(localStorage.getItem("tickerspot"));
    if (res == undefined) {
      console.log('local storage error');
    }
    else {
      let param = e.target.value.split(" ");
      let market = res.filter(x => x.symbol.includes(param[0]))
      market.sort(function(a, b) { return b[param[1]] - a[param[1]] })
      let subset = market.slice(0, param[2] )
      setTickerSpot(subset);
    }
    setIsSending(false);
  }, [isSending]);

  const LoadStat = async (e) => {
    let statData = await JSON.parse(localStorage.getItem("tickers"));
    if (statData) {
      let param = sortParam.split(" ");
      let market = statData.filter(x => x.symbol.includes(param[0]))
      market.sort(function(a, b) { return b[param[1]] - a[param[1]] })
      let subset = market.slice(0, param[2] )
      setTickers(subset);
    }
  }

  const LoadStatSpot = async () => {
    let statData = await JSON.parse(localStorage.getItem("tickerspot"));
    if (statData) {
      let param = sortParam.split(" ");
      let market = statData.filter(x => x.symbol.includes(param[0]))
      market.sort(function(a, b) { return b[param[1]] - a[param[1]] })
      let subset = market.slice(0, param[2] )
      setTickerSpot(subset);
    }
  }
  useEffect(() => {
    //LoadStat();
    //LoadStatSpot();
    //console.log(location);
  }, []);

  return (
    <div className='home-container'>
      <h3 className="home-header">Version 1.0.0 Trading AUTOMATION</h3>
      <div className='home-flex'>
        <select className='info-select' onChange={(e) => setInput(e.target.value)}> 
        <option value="">pick</option>
          {tickers && tickers.map((a, b) => (
            <option key={b} value={a.symbol + " 2 10"}>{a.symbol}</option>
              )
            )
          }
        </select>
        <input ref={inputRef} type='text' name='pair' className="home-input" placeholder='pair..' value={input ? input : ""} onChange={(e) => setInput(e.target.value)}/>
        <button className="home-button" disabled={isSending} onClick={getFutures} value={input}>Info F</button>
        <button className="home-button" disabled={isSending} onClick={getSpot} value={input}>Info S</button>
        <button className="home-button" disabled={isSending} onClick={getFutureCache} value={input }>F Che </button>
        <button className="home-button" disabled={isSending} onClick={getSpotCache} value={input }>S Che</button>
        <input type='text' className='home-info' placeholder='exInfo..' value={strInfo} onChange={(e) => setStrInfo(e.target.value)} />
      </div>
      {strInfo && <div className='home-flex'>
      <div>P Prs&nbsp;&nbsp; Tk Sz&nbsp;&nbsp;Q prs&nbsp;&nbsp;Ste Sz&nbsp;&nbsp; P prec</div>
        <div>{strInfo}</div>&nbsp;&nbsp;
        </div>}
      <div className='home-flex'>
        <select className='info-select' onChange={(e) => setLeverage(e.target.value)}> 
          <option value="">pick</option>
          {tickers && tickers.map((a, b) => (
            <option key={b} value={a.symbol + " 1"}>{a.symbol}</option>
              )
            )
          }
        </select>
        <input type='text' name='lev' className="home-input" placeholder='lever..' value={leverage ? leverage : ""} onChange={(e) => setLeverage(e.target.value)}/>
        <button className="home-button" disabled={isSending} onClick={changeLeverage} value={leverage ? leverage : ""}>Lev</button>
        <button className="home-button" disabled={isSending} onClick={getTwitter} >Tweeter</button>
        <button className="home-button" disabled={isSending} onClick={getTwitter} >Tweets</button>
      </div>
      <div className='home-flex'>
        <select className='info-select' onChange={(e) => setSortParam(e.target.value)}> 
          <option value="">pick</option>
          <option value="USDT volume 10">USDT vol 10</option>
          <option value="USDT quoteVolume 10">USDT qVol 10</option>
          <option value="USDT price 10">USDT price 10</option>
          <option value="BTC volume 20"> BTC volume 20</option>
        </select>
        <input type='text' name='lev' className="home-input" placeholder='sort by..' value={sortParam ? sortParam : ""} onChange={(e) => setSortParam(e.target.value)}/>
        <button className="home-button" disabled={isSending} onClick={GetTickers} value={sortParam ? sortParam : ""}>Ticker F</button>
        <button className="home-button" disabled={isSending} onClick={GetCache} value={sortParam ? sortParam : ""}>cache F</button>
        <button className="home-button" disabled={isSending} onClick={GetTickerSpot} value={sortParam ? sortParam : ""}>Ticker S</button>
        <button className="home-button" disabled={isSending} onClick={GetCacheSpot} value={sortParam ? sortParam : ""}>cache S</button>
      </div>
      <div className='home-flex'>
        {tickers && tickers.map((a, b) => (
              <div className="ticker-space" key={b}>
                <span>symbol:&nbsp;&nbsp;{a.symbol}</span>&nbsp;&nbsp;
                <span>Change:&nbsp;&nbsp;{a.priceChange}</span>&nbsp;&nbsp;
                <span>%Change:&nbsp;&nbsp;{a.priceChangePercent}</span>&nbsp;&nbsp;
                <span>low P:&nbsp;&nbsp;{a.lowPrice}</span>&nbsp;&nbsp;
                <span>high P:&nbsp;&nbsp;{a.highPrice}</span>&nbsp;&nbsp;
                <span>vol:&nbsp;&nbsp;{a.volume}</span>
                <button className="home-button" disabled={isSending} onClick={getFutureCache} value={a.symbol + " 2 10"}>Info F</button>
              </div>
              )
            )
          }
      </div>
      <div className='home-flex'>
        {tickerSpot && tickerSpot.map((a, b) => (
              <div className="ticker-space" key={b}>
                <span>symbol:&nbsp;&nbsp;{a.symbol}</span>&nbsp;&nbsp;
                <span>Change:&nbsp;&nbsp;{a.priceChange}</span>&nbsp;&nbsp;
                <span>%Change:&nbsp;&nbsp;{a.priceChangePercent}</span>&nbsp;&nbsp;
                <span>low P:&nbsp;&nbsp;{a.lowPrice}</span>&nbsp;&nbsp;
                <span>high P:&nbsp;&nbsp;{a.highPrice}</span>&nbsp;&nbsp;
                <span>vol:&nbsp;&nbsp;{a.volume}</span>
                <button className="home-button" disabled={isSending} onClick={getSpotCache} value={a.symbol + " 3 10"}>Info S</button>
              </div>
              )
            )
          }
      </div>
    </div>
  )
}

export default Home;
//"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
