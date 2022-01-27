import React, { useState, useEffect } from "react";
import CancelOrder from "../lib/CancelOrder";
import './calc.css';

const Order = React.memo((props) => {
  const [order, setOrder] = useState([]); 

  const timo = (a) => { 
    const b = new Date(a);
    return  b.getHours() + ":" + b.getMinutes() + ":" + b.getSeconds();
  };
 

  const cancelHandler = async (e) => {
    const res = await CancelOrder(e.target.value);
    if (res == undefined) {console.log('api error')}
    else {
      let checkk = [...order].filter((x) => x.c !== res.clientOrderId);
      setOrder(checkk);
    }
  }

  const currentLoader = () => {
    const orders = props.currentOrder;
    if (orders == null) {}
    else {
      setOrder(e => e = orders)
    }
  } 
  
  const orderLoader = async () => {
    const update = props.order;
    if ( update == null ) {}
    else {
      console.log(update);
      if ( update.X == "NEW" && update.o == "STOP" ) {
        setOrder(e => [update, ...e]);
      }
      else if ( update.X == "NEW" && update.o == "LIMIT" && update.ot == "LIMIT" ) {
        setOrder(e => [update, ...e]);
      }
      else if ( update.X == "FILLED" ) {
        let checkk = [...order].filter((x) => x.i !== update.i);
        setOrder(checkk);
        console.log('order filled')
      }
      else if ( update.X == "PARTIALLY_FILLED" ) {
        console.log('order partly filled');
      }
      else if ( update.x == "CANCELED" || update.X == "CANCELED" || update.X == "EXPIRED" || update.x == "EXPIRED" ) {
        let currOrder = [...order];
        if (currOrder.length > 0) {
          let checkk = currOrder.filter((x) => x.i !== update.i);
          setOrder(checkk);
          console.log('order cancelled');
        }
      }
      else {
        console.log('unknown order yet OR LIMIT TRIGGER');
      }
    }
  }
    
  useEffect(() => {
      currentLoader();
  }, [props.currentOrder]);
  
  useEffect(() => {
      orderLoader();
  }, [props.order]);

  return (
    <div className="orderDiv">
      {order && order.map((a, b) => (
                    <div key={b} className={(a.ps == "LONG") ? "long" : "short"}>
                        <span>Order@&nbsp;&nbsp;{timo(a.T)}&nbsp;&nbsp;</span>
                        <span>Symbol:&nbsp;&nbsp;{a.s}&nbsp;&nbsp;</span>
                        <span>Side:&nbsp;{a.S}&nbsp;&nbsp;</span>
                        <span>PSide:&nbsp;{a.ps}&nbsp;&nbsp;</span>
                        <span>Qty:&nbsp;{a.q}&nbsp;&nbsp;</span>
                        <span>Tri P:&nbsp;{a.sp}&nbsp;&nbsp;</span>
                        <span>Pri:&nbsp;{a.p}&nbsp;&nbsp;</span>
                        <button className="cate" type="button" value={a.s + " " + a.i + " " + a.c} onClick={cancelHandler}>del</button>
                    </div>
                )
            )
        }
    </div>
  );
});
export default Order;
//{a.ps ? <span>PSide:&nbsp;{a.ps}&nbsp;&nbsp;</span> : <span>x</span>}
