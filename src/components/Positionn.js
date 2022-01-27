import React, { useState, useEffect } from "react";
import BinanceMOrder from "../lib/BinanceMOrder";
import './calc.css';

const Position = (props) => {
  const [position, setPosition] = useState([]);

  const timo = (a) => { 
    const b = new Date(a);
    return  b.getHours() + ":" + b.getMinutes() + ":" + b.getSeconds();
  };

  const closeHandler = async (e) => {
    const res = await BinanceMOrder(e.target.value);
    if (res == undefined) {console.log('api error')}
    else {
      let checkk = [...position].filter((x) => x.ps !== res.positionSide);
      setPosition(checkk);
    }
  }

  const positionLoader = () => {
    const temp = props.position;
    if (temp == null) {console.log('no position to set')}
    else  {
      let target = temp.filter((x) => x.pa !== '0');
      let curPos = [...position];
      let curPosLong;
      let curPosShort;
      if (curPos.length > 1) {
        curPosLong = curPos.filter(e => e.ps == "LONG");
        curPosShort = curPos.filter(e => e.ps == "SHORT");
      }
      if (target.length > 0 && target[0].pa < 0) {
        //short coming in...
        if (curPos.length = 1 && curPos[0].pa < 0) {
          //short in state
          if (target[0].ep > 0.0001) {
            //adding to position
            curPos[0].pa = parseFloat(curPos[0].pa) + parseFloat(target[0].pa);
            setPosition(e => e = curPos);
          } else if (target[0].ep < 0.0001){
            //reducing position
            curPos[0].pa = parseFloat(curPos[0].pa) - parseFloat(target[0].pa);
            setPosition(e => e = curPos);
          } else {
            console.log('shorting not clear');
          }
        }else if (curPos.length = 1 && curPos[0].pa > 0) {
          //long in state
          setPosition(e => [...e, target[0]]);
        } else if (curPos.length < 1) {
          setPosition(e => [...e, target[0]]);
        } else if (curPos.length = 2) {
            if (target[0].ep > 0.0001) {
              //adding to position
              curPosShort[0].pa = parseFloat(curPosShort[0].pa) + parseFloat(target[0].pa);
              let newState = curPosLong.concat(curPosShort);
              setPosition(e => e = newState);
            } else if (target[0].ep < 0.0001){
              //reducing position
              curPosShort[0].pa = parseFloat(curPosShort[0].pa) - parseFloat(target[0].pa);
              let newState = curPosLong.concat(curPosShort);
              setPosition(e => e = newState);
            } else {
              console.log('shorting not clear');
            }
          } 
      } else if (target.length > 0 && target[0].pa > 0) {
        //long coming in
        if (curPos.length = 1 && curPos[0].pa > 0) {
          //long in state
          if (target[0].ep > 0.0001) {
            //adding to position
            curPos[0].pa = parseFloat(curPos[0].pa) + parseFloat(target[0].pa);
            setPosition(e => e = curPos);
          } else if (target[0].ep < 0.0001){
            //reducing position
            curPos[0].pa = parseFloat(curPos[0].pa) - parseFloat(target[0].pa);
            setPosition(e => e = curPos);
          } else {
            console.log('long not clear');
          }
        }else if (curPos.length = 1 && curPos[0].pa < 0) {
          //short in state
          setPosition(e => [...e, target[0]]);
        } else if (curPos.length < 1) {
          setPosition(e => [...e, target[0]]);
        } else if (curPos.length = 2) {
            if (target[0].ep > 0.0001) {
                //adding to position
                curPosLong[0].pa = parseFloat(curPosLong[0].pa) + parseFloat(target[0].pa);
                let newState = curPosLong.concat(curPosShort);
                setPosition(e => e = newState);
            } else if (target[0].ep < 0.0001){
                //reducing position
                curPosLong[0].pa = parseFloat(curPosLong[0].pa) - parseFloat(target[0].pa);
                let newState = curPosLong.concat(curPosShort);
                setPosition(e => e = newState);
            } else {
                console.log('long not clear');
            }
        }
      }
    } 
  } 
  const currentPositionLoader = () => {
    const temp = props.position;
    if (temp == null) {console.log('no position to set')}
    else  {
      setPosition(e => e = temp);
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
                    <div key={b}>
                        <span>Position@&nbsp;&nbsp;{timo(Date.now())}&nbsp;&nbsp;</span>
                        <span>Symbol:&nbsp;&nbsp;{a.s}&nbsp;&nbsp;</span>
                        <span>PSide:&nbsp;{a.ps}&nbsp;&nbsp;</span>
                        <span>Qty:&nbsp;{a.pa}&nbsp;&nbsp;</span>
                        <span>EntryP:&nbsp;{a.ep}&nbsp;&nbsp;</span>
                        <span>prePnL:&nbsp;{a.cr}&nbsp;&nbsp;</span>
                        <span>uPnL:&nbsp;{a.up}&nbsp;&nbsp;</span>
                        <button className="cate" type="button" value={a.s + " " + a.pa + " " + a.ps} onClick={closeHandler}>clo</button>
                    </div>
                )
            )
        }
    </div>
  );
};
export default Position;
