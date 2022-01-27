import React, { useState, useEffect, useRef, useCallback } from "react";
import BinanceMOrder from "../lib/BinanceMOrder";
import BinanceLOrder from "../lib/BinanceLOrder";
import './calc.css';

const Position = React.memo((props) => {
  const [position, setPosition] = useState([]);
  const [limitPrice, setLimitPrice] = useState("");
  const [slimitPrice, setsLimitPrice] = useState("");
  const [isSending, setIsSending] = useState(false);
  const limitPriceRef = useRef("");
  const slimitPriceRef = useRef("");

  const timo = (a) => { 
    const b = new Date(a);
    return  b.getHours() + ":" + b.getMinutes() + ":" + b.getSeconds();
  };

  const decFunc = (e) => {
    let lim = props.pair.split(" ").splice(4, 5);
    let newP = parseFloat(e.target.value) - (parseFloat(lim[1]) * parseFloat(lim[3]));
    setLimitPrice(c => c = newP.toFixed(lim[2])); 
  }
  const incFunc = (e) => {
    let lim = props.pair.split(" ").splice(4, 5);
    let newP = parseFloat(e.target.value) + (parseFloat(lim[1]) * parseFloat(lim[3]));
    setLimitPrice(c => c = newP.toFixed(lim[2])); 
  }
  const decFuncs = (e) => {
    let lim = props.pair.split(" ").splice(4, 5);
    let newP = parseFloat(e.target.value) - (parseFloat(lim[1]) * parseFloat(lim[3]));
    setsLimitPrice(c => c = newP.toFixed(lim[2])); 
  }
  const incFuncs = (e) => {
    let lim = props.pair.split(" ").splice(4, 5);
    let newP = parseFloat(e.target.value) + (parseFloat(lim[1]) * parseFloat(lim[3]));
    setsLimitPrice(c => c = newP.toFixed(lim[2])); 
  }

  const LimitHandler = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    let valArr = e.target.value.split(" ");
    // let inputR = limitPriceRef.current.value;
    // let sinputR = slimitPriceRef.current.value;
    let side;
    let lim = props.pair.split(" ").splice(4, 5);
    if (valArr[2] == "LONG") {
        side = "SELL";
    } else {}
    if (valArr[2] == "SHORT") {
        side = "BUY";
    } else {}
    if (valArr[2] == "LONG") {
      let params = parseFloat(valArr[4]).toFixed(lim[2]) + " " + side + " " + valArr[2] + " LIMIT " + valArr[1] + " " + valArr[3] + " GTC FALSE";
      const res = await BinanceLOrder(params);
      if (res == undefined) {console.log('api error')}
      else {
        console.log(res);
      }
    } else {}
    if (valArr[2] == "SHORT") {
      let params = parseFloat(valArr[4]).toFixed(lim[2]) + " " + side + " " + valArr[2] + " LIMIT " + valArr[1] + " " + Math.abs(valArr[3]) + " GTC FALSE";
      const res = await BinanceLOrder(params);
      if (res == undefined) {console.log('api error')}
      else {
        console.log(res);
      }
    } else {} 
    setIsSending(false);
  }, [isSending]);

  const CloseHandler = useCallback(async (e) => {
    if (isSending) return
    setIsSending(true);
    const res = await BinanceMOrder(e.target.value);
    if (res == undefined) {console.log('api error')}
    else {
      console.log(res);
      let checkk = [...position].filter((x) => x.ps !== res.positionSide);
      setPosition(checkk);
    }
    setIsSending(false);
  }, [isSending]);
  
  const positionLoader = () => {
    const temp = props.position;
    if (temp == null) {console.log('no position to set')}
    else  {
      console.log(temp);
      let target = [...temp];
      let curPos = [...position];
      let curPosLong;
      let curPosShort;
      if (curPos.length > 1) {
        curPosLong = curPos.filter(e => e.ps == "LONG");
        curPosShort = curPos.filter(e => e.ps == "SHORT");
      } else {}
      if (target[2].pa < 0 && target[2].ep > 0.0001) {
        //short coming in...
        if (curPos.length == 1 && curPos[0].pa < 0) {
          //short in state
            setPosition( e => e = [target[2]]);
            setsLimitPrice(target[2].ep);
          
        }else if (curPos.length == 1 && curPos[0].pa > 0) {
          //long in state
          setPosition(e => [...e, target[2]]);
          setsLimitPrice(target[2].ep);
        } else if (curPos.length < 1) {
          setPosition(e => e = [target[2]]);
          setsLimitPrice(target[2].ep);
        } else if (curPos.length == 2) {
            if (target[0].ep > 0.00001) {
              let newState = curPosLong.push(target[2]);
              setPosition(newState);
              setsLimitPrice(target[2].ep);
            } else {}
          } 
      } else {} 
      if (target[1].pa > 0 && target[2].ep > 0.00001) {
        //long coming in
        if (curPos.length == 1 && curPos[0].pa < 0) {
          //short in state
          setPosition(e => [...e, target[1]]);
          setLimitPrice(target[1].ep);
          
        }else if (curPos.length == 1 && curPos[0].pa > 0) {
          //long in state
          setPosition(e => e = [target[1]]);
          setLimitPrice(target[1].ep);
        } else if (curPos.length < 1) {
          setPosition(e => e = [target[1]]);
          setLimitPrice(target[1].ep);
        } else if (curPos.length == 2) {
            if (target[1].ep > 0.0001) {
              let newState = curPosShort.push(target[1]);
              setPosition(newState);
              setLimitPrice(target[1].ep);
            } else {}
          } 
      } else {}
      if (target[2].pa == "0" && target[2].ep < 0.0001) {
        //close short coming in...
        if (curPos.length == 1 && curPos[0].pa < 0) {
          //short in state
          setPosition( e => e = []);
          setsLimitPrice("");
          
        } 
        else if (curPos.length == 2) {
            if (target[0].ep > 0.00001) {
              setPosition(curPosLong);
            } else {}
          } 
      } else {} 
      if (target[1].pa == "0" && target[2].ep < 0.0001) {
        //close long coming in...
        if (curPos.length == 1 && curPos[0].pa > 0) {
          // long in state
          setPosition( e => e = []);
          setLimitPrice("");
          
        } 
        else if (curPos.length == 2) {
            if (target[0].ep > 0.00001) {
              setPosition(curPosShort);
            } else {}
          } 
      } else {} 
    } 
  } 
  const currentPositionLoader = () => {
    const temp = props.currentPosition;
    if (temp == null) {console.log('no position to set')}
    else  {
      setPosition(e => e = temp);
      let long = temp.filter(x => x.pa > 0);
      let short = temp.filter(x => x.pa < 0);
      if (long.length > 0) {
        setLimitPrice(long[0].ep);
      } else {}
      if (short.length > 0) {
        setsLimitPrice(short[0].ep);
      } else{} 
    }
  } 

  useEffect(() => {
    positionLoader();
  }, [props.position]);

  useEffect(() => {
    currentPositionLoader();
  }, [props.currentPosition]);

  return (
    <div className="orderDiv">
      {position && position.map((a, b) => (
                    <div key={b} className={(a.ps == "LONG") ? "long" : "short"}>
                      <div className='position-flex'>
                        <button className="poButton" type="button" value={a.s + " " + a.pa + " " + a.ps} onClick={CloseHandler}>MC</button>
                        <div className="poText">Po@&nbsp;&nbsp;{timo(Date.now())}&nbsp;&nbsp;</div>
                        <div className="poText">Syb:&nbsp;&nbsp;{a.s}&nbsp;&nbsp;</div>
                        <div className="poText">PS:&nbsp;{a.ps}&nbsp;&nbsp;</div>
                        <div className="poText">Qty:&nbsp;{a.pa}&nbsp;&nbsp;</div>
                        <div className="poText">EnP:&nbsp;{a.ep}&nbsp;&nbsp;</div>
                        {(a.ps == "LONG") ? <div className='tradeFlex'>
                          <button className='poincButton' type="button" value={limitPrice ? limitPrice : ""} onClick={decFunc}>-</button>
                          <input ref={limitPriceRef} className="poInput" type="text" onChange={(e) => setLimitPrice(e.target.value)} value={limitPrice ? limitPrice : ""} />
                          <button className='poincButton' type="button" value={limitPrice ? limitPrice : ""} onClick={incFunc}>+</button>
                          <button className="poButton" type="button" value={a.ep + " " + a.s + " " + a.ps + " " + a.pa + " " + limitPrice} onClick={LimitHandler}>LC</button>
                        </div> : <div className='tradeFlex'>
                          <button className='poincButton' type="button" value={slimitPrice ? slimitPrice : ""} onClick={decFuncs}>-</button>
                          <input ref={slimitPriceRef} className="poInput" type="text" onChange={(e) => setsLimitPrice(e.target.value)} value={slimitPrice ? slimitPrice : ""} />
                          <button className='poincButton' type="button" value={slimitPrice ? slimitPrice : ""} onClick={incFuncs}>+</button>
                          <button className="poButton" type="button" value={a.ep + " " + a.s + " " + a.ps + " " + a.pa + " " + slimitPrice} onClick={LimitHandler}>LC</button>
                        </div>}
                      </div>
                    </div>
                )
            )
        }
    </div>
  );
});
export default Position;
