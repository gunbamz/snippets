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
      let target = temp.filter(x => x.pa != 0);
      let curPos = [...position];
      let curPosLong;
      let curPosShort;
      if (curPos.length > 1) {
        curPosLong = curPos.filter(e => e.ps == "LONG");
        curPosShort = curPos.filter(e => e.ps == "SHORT");
      } else {}
      if (target.length > 0 && target[0].pa < 0) {
        //short coming in...
        if (curPos.length == 1 && curPos[0].pa < 0) {
          //short in state
          if (target[0].ep > 0.00001) {
            //adding to position
            curPos[0].pa = parseFloat(curPos[0].pa) + parseFloat(target[0].pa);
            setPosition(curPos);
            setsLimitPrice(target[0].ep);
          } else if (target[0].ep < 0.00001){
            //reducing position
            curPos[0].pa = parseFloat(curPos[0].pa) - parseFloat(target[0].pa);
            setPosition(curPos);
            setsLimitPrice(target[0].ep);
          } else {
            console.log('shorting not clear');
          }
        }else if (curPos.length == 1 && curPos[0].pa > 0) {
          //long in state
          setPosition(e => [...e, target[0]]);
          setsLimitPrice(target[0].ep);
        } else if (curPos.length < 1) {
          setPosition(target);
          setsLimitPrice(target[0].ep);
        } else if (curPos.length == 2) {
            if (target[0].ep > 0.00001) {
              //adding to position
              curPosShort[0].pa = parseFloat(curPosShort[0].pa) + parseFloat(target[0].pa);
              let newState = curPosLong.concat(curPosShort);
              setPosition(newState);
              setsLimitPrice(target[0].ep);
            } else if (target[0].ep < 0.00001){
              //reducing position
              curPosShort[0].pa = parseFloat(curPosShort[0].pa) - parseFloat(target[0].pa);
              let newState = curPosLong.concat(curPosShort);
              setPosition(newState);
              setsLimitPrice(target[0].ep);
            } else {
              console.log('shorting not clear');
            }
          } 
      } else {} 
      if (target.length > 0 && target[0].pa > 0) {
        //long coming in
        if (curPos.length == 1 && curPos[0].pa > 0) {
          //long in state
          if (target[0].ep > 0.00001) {
            //adding to position
            curPos[0].pa = parseFloat(curPos[0].pa) + parseFloat(target[0].pa);
            setPosition(curPos);
            setLimitPrice(target[0].ep);
          } else if (target[0].ep < 0.00001){
            //reducing position
            curPos[0].pa = parseFloat(curPos[0].pa) - parseFloat(target[0].pa);
            setPosition(curPos);
            setLimitPrice(target[0].ep);
          } else {
            console.log('long not clear');
          }
        }else if (curPos.length == 1 && curPos[0].pa < 0) {
          //short in state
          setPosition(e => [...e, target[0]]);
          setLimitPrice(target[0].ep);
        } else if (curPos.length < 1) {
          setPosition(target);
          setLimitPrice(target[0].ep);
        } else if (curPos.length == 2) {
            if (target[0].ep > 0.00001) {
                //adding to positionn
                curPosLong[0].pa = parseFloat(curPosLong[0].pa) + parseFloat(target[0].pa);
                let newState = curPosLong.concat(curPosShort);
                setPosition(newState);
                setLimitPrice(target[0].ep);
            } else if (target[0].ep < 0.00001){
                //reducing position
                curPosLong[0].pa = parseFloat(curPosLong[0].pa) - parseFloat(target[0].pa);
                let newState = curPosLong.concat(curPosShort);
                setPosition(newState);
                setLimitPrice(target[0].ep);
            } else {
                console.log('long not clear');
            }
        }  
      } else {}
      if (target.length < 1) {
        let targett = temp.filter(x => x.ep > 0.00001);
        if (curPos.length == 1 && targett.length < 1) {
          setPosition([]);
        } else if (curPos.length == 2 && targett.length < 1) {
          let target = temp.filter(x => x.cr > 1);
          let ex = target[0].ps;
          let newState = curPos.filter(x => x.ps !== ex);
          setPosition(newState);
        } else {
            console.log('position not clear oo');
          }
       }
    } 
  } 
  const currentPositionLoader = () => {
    const temp = props.currentPosition;
    if (temp == null) {console.log('no position to set')}
    else  {
      console.log(temp);
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
                        <div>Po@&nbsp;&nbsp;{timo(Date.now())}&nbsp;&nbsp;</div>
                        <div>Syb:&nbsp;&nbsp;{a.s}&nbsp;&nbsp;</div>
                        <div>PS:&nbsp;{a.ps}&nbsp;&nbsp;</div>
                        <div>Qty:&nbsp;{a.pa}&nbsp;&nbsp;</div>
                        <div>EnP:&nbsp;{a.ep}&nbsp;&nbsp;</div>
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
 // if (sinputR.length < 1 && inputR.length < 1) {
    //   if (valArr[3] == "LONG") {
    //     let priceInput = parseFloat(valArr[0]) * 1.01;
    //     let params = priceInput.toFixed(lim[2]) + " " + side + " " + valArr[2] + " LIMIT " + valArr[1] + " " + valArr[3] + " GTC FALSE";
    //     const res = await BinanceLOrder(params);
    //     if (res == undefined) {console.log('api error')}
    //     else {
    //       console.log(res);
    //     }
    //   } else if (valArr[3] == "SHORT") {
    //     let priceInput = parseFloat(valArr[0]) * 0.99
    //     let params = priceInput.toFixed(lim[2]) + " " + side + " " + valArr[2] + " LIMIT " + valArr[1] + " " + valArr[3] + " GTC FALSE";
    //     const res = await BinanceLOrder(params);
    //     if (res == undefined) {console.log('api error')}
    //     else {
    //       console.log(res);
    //     }
    //   } else {console.log("double failure")}
    // }
