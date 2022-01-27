import React, { useState, useEffect } from "react";
import BinanceMOrder from "../lib/BinanceMOrder";
import './calc.css';

const LongPosition = (props) => {
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
    const temp = props.longPosition;
  } 

  useEffect(() => {
    positionLoader();
  }, [props.longPosition]);

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
                        <button className="cate" type="button" value={a.s + " " + a.pa + " " + a.ps} onClick={closeHandler}>MC</button>
                    </div>
                )
            )
        }
    </div>
  );
};
export default LongPosition;
