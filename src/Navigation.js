import React, { useState, useEffect, useCallback, useRef, useContext} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getListenKey, keepAlive } from './lib/ListenKey';
import { getListenKeys, keepAlives } from './lib/ListenKeySpot';
import Context from "./Context";
import './Navigation.css'

const Navigation = () => {
  const [status, setStatus] = useState("");
  const [input, setInput] = useState("BTCUSDT");
  const [listenKey, setListenKey] = useState("");
  const [slistenKey, setsListenKey] = useState("");
  const [mode, setMode] = useState("FUTURES");
  const [isSending, setIsSending] = useState(false);
  const [timer, setTimer] = useState('00:00:00');
  const modeRef = useRef("");
  const listenKeyRef = useRef("");
  const slistenKeyRef = useRef("");
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const {value} = useContext(Context);

  const resetInput = (e) => {
    e.preventDefault();
    setInput(x => x = "");
  }
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 * 60 * 60) % 24);
    return {
        total, hours, minutes, seconds
    };
}

const startTimer = (e) => {
  let { total, hours, minutes, seconds } 
              = getTimeRemaining(e);
  if (total >= 0) {
    setTimer(
        (hours > 9 ? hours : '0' + hours) + ':' +
        (minutes > 9 ? minutes : '0' + minutes) + ':'
        + (seconds > 9 ? seconds : '0' + seconds)
    )
  } else {
      ping();
      pings();
      clearTimer(getDeadTime());
  }
}
const clearTimer = (e) => {  
  setTimer('00:30:00');
  if (timerRef.current) clearInterval(timerRef.current);
  const id = setInterval(() => {
      startTimer(e);
  }, 1000)
  timerRef.current = id;
}
const getDeadTime = () => {
  let deadline = new Date();
  deadline.setMinutes(deadline.getMinutes() + 30);
  return deadline;
}

  const keyHandler = useCallback(async () => {
    if (isSending) return
    setIsSending(true);
    let temp = modeRef.current.value;
    console.log(temp);
    if (temp == "FUTURES") {
      const res = await getListenKey();
      if (res == undefined) {console.log('api error')}
      else {
        setListenKey(res.listenKey);
        clearTimer(getDeadTime());
      }
    } else {console.log("you are in Spot mode")}
    setIsSending(false);
  }, [isSending]);

  const changeHandler = (e) => {
    let safety = e.target.value.split(" ");
    let temp = modeRef.current.value;
    console.log(safety);
    if (safety.length == 15) {
      if (temp == "FUTURES") {
        let key = listenKeyRef.current.value;
        setInput(e.target.value + " " + key);
      } else if (temp == "SPOT") {
        let skey = slistenKeyRef.current.value;
        setInput(e.target.value + " " + skey);
      }
    } else {
      setInput(e.target.value);
    }
  }

  const keyHandlerSpot = useCallback(async () => {
    if (isSending) return
    setIsSending(true);
    let temp = modeRef.current.value;
    console.log(temp);
    if (temp == "SPOT") {
      const res = await getListenKeys();
      if (res == undefined) {console.log('api error')}
      else {
        setsListenKey(res.listenKey);
        clearTimer(getDeadTime());
      }
    } else { console.log("you are in Futures mode")}
    setIsSending(false);
  }, [isSending]);
  const updateInput = () => {
    let contextVal = value;
    if (contextVal == null) {}
    else {
      let temp = modeRef.current.value;
      if (temp == "FUTURES") {
        let key = listenKeyRef.current.value;
        setInput(value + " " + key);
      } else {
        let skey = slistenKeyRef.current.value;
        setInput(value + " " + skey);
      }
    }
  }

  const pings = async () => {
    let key = slistenKeyRef.current.value.length;
    let temp = modeRef.current.value;
    if (key < 2) {console.log("no key set")}
    else if (temp == "SPOT" && key > 1) {
      const res = await keepAlives(temp);
      if (res == undefined) {
        console.log('api error')
        setStatus('NO');
      }
      else {
        console.log(res);
        setStatus('YES');
      }
    } 
    else {console.log("ping not working")};
  }
  const ping = async () => {
    let key = listenKeyRef.current.value.length;
    let temp = modeRef.current.value;
    if (key < 2) {console.log("no key set")}
    else if (temp == "FUTURES" && key > 1) {
      const res = await keepAlive();
      if (res == undefined) {
        console.log('api error');
        setStatus('NO');
      }
      else {
        console.log(res);
        setStatus('YES');
      }
    } 
    else {console.log("ping not working")};
  }
  
  const modeHandler = (e) => {
    let temp = e.target.checked;
    if (temp == false) {
      setMode("FUTURES");
    } else {
      setMode("SPOT");
    }
  }
  let activeStyle = {
    background: "rgba(163, 214, 185, 0.644)"
  };

  useEffect(() => {
    updateInput()
    console.log('component mounts');
  }, [value]);
  
  return (
        <header>
          <div className="headerContainer">
            <div className="header-row">
              <NavLink to={"/"} state={{pair: input}} style={({ isActive }) => isActive ? activeStyle : undefined}>
                HOME
              </NavLink> &nbsp;&nbsp;&nbsp;
              <NavLink to="/market" state={{pair: input}} style={({ isActive }) => isActive ? activeStyle : undefined}>
                RATIO
              </NavLink>&nbsp;&nbsp;&nbsp;
              <NavLink to="/analysis" state={{pair: input}} style={({ isActive }) => isActive ? activeStyle : undefined}>
                FUT
              </NavLink>&nbsp;&nbsp;&nbsp;
              <NavLink to="/spot" state={{pair: input}} style={({ isActive }) => isActive ? activeStyle : undefined}>
                SPO
              </NavLink>&nbsp;&nbsp;&nbsp;
              <NavLink to="/blocknetwork" state={{pair: input}} style={({ isActive }) => isActive ? activeStyle : undefined}>
                CHAIN
              </NavLink>&nbsp;&nbsp;&nbsp;
              <NavLink to="/exinfo" state={{pair: input}} style={({ isActive }) => isActive ? activeStyle : undefined}>
                INFO
              </NavLink>&nbsp;&nbsp;&nbsp;
              <button className="home-button" type="button" disabled={isSending} onClick={resetInput}>Reset</button>
              <button className="home-button" type="button" disabled={isSending} onClick={keyHandler}>KeyF</button>
              <button className="home-button" type="button" disabled={isSending} onClick={keyHandlerSpot}>KeyS</button>
              <label className="switch">
                <input type="checkbox" name="toggle" onClick={modeHandler}></input>
                <span className="slider round"></span>
              </label>
              <input
                className="inputMode"
                ref={modeRef}
                type='text'
                placeholder='mode...'
                value={mode}
                onChange={(e) => setMode(e.target.value)}
              />
              <input
              ref={slistenKeyRef}
                type='text'
                className='inputBoxKey'
                placeholder='spotkey...'
                value={slistenKey}
                onChange={(e) => setsListenKey(e.target.value)}
              />
              <h2 className="timerClass">{timer}</h2>{status}
            </div>
            <div className="header-row">
              <select className="inputList" onChange={changeHandler}> 
                <option value="">Select from List</option>
                <option value="btcusdt 5m 50 1.0020 3 10 2 0.01 3 0.001 1 STOP GTC FALSE 4">btcusdt 5m F</option>
                <option value="btcusdt 1m 50 1.0020 3 10 2 0.01 3 0.001 1 STOP GTC FALSE 4">btcusdt 1m F</option>
                <option value="ethusdt 5m 50 1.0020 3 10 2 0.01 3 0.001 1 STOP GTC FALSE 4">ethusdt 5m F</option>
                <option value="ethusdt 1m 50 1.0020 3 10 2 0.01 3 0.001 1 STOP GTC FALSE 4">ethusdt 1m F</option>
                <option value="adausdt 5m 50 1.0020 3 10 5 0.00010 0 1 1 STOP GTC FALSE 4">adausdt 5m F</option>
                <option value="adausdt 1m 50 1.0020 3 10 5 0.00010 0 1 1 STOP GTC FALSE 4">adausdt 1m F</option>
                <option value="galausdt 5m 50 1.0020 3 10 5 0.00010 0 1 1 STOP GTC FALSE 4">galausdt 5m F</option>
                <option value="galausdt 1m 50 1.0020 3 10 5 0.00010 0 1 1 STOP GTC FALSE 4">galausdt 1m F</option>
                <option value="galausdt 1m 50 1.0020 3 10 5 0.00010 0 1 1 STOP_LOSS_LIMIT GTC FALSE 4">galausdt 1m S</option>
                <option value="xvsusdt 1m 50 1.0020 3 10 5 0.00010 0 1 1 STOP_LOSS_LIMIT GTC FALSE 4">xvsusdt 1m S</option>
                <option value="xvsbnb 1m 50 1.0020 3 10 5 0.00010 0 1 1 STOP_LOSS_LIMIT GTC FALSE 3">xvsusdt 1m S</option>
                <option value="100 BUSD XVS CAKE WBNB">100 BUSD XVS CAKE WBNB</option>
                <option value="0.5 WBNB CAKE">0.5 WBNB CAKE</option>
                <option value="100 USDT WBNB">100 USDT WBNB</option>
                <option value="0.1 ETH WBNB">0.1 ETH WBNB</option>
              </select>
              <input
                type='text'
                className='inputBox'
                placeholder='pair...'
                value={input}
                onChange={changeHandler}
              />
              <input
              ref={listenKeyRef}
                type='text'
                className='inputBoxKey'
                placeholder='futureskey...'
                value={listenKey}
                onChange={(e) => setListenKey(e.target.value)}
              />
            </div> 
          </div>      
      </header> 
  );
};
export default Navigation;