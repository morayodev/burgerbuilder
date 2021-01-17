import React from 'react'
import Burger from './Burger'
 
import "./checkOut.css";

function CheckOut(props) {
    return (
      <div className="checkOut">
        <h1>We hope it taste nice?</h1>
        <div style={{ width: "100%", margin: "auto" }}>
          <Burger ingredient={props.ingredientsss} />
        </div>
        <button className="Button Danger" onClick={props.cancelPage}>
          CANCEL
        </button>
        <button className="Button Success" onClick={props.continuePage}>
          CONTINUE
        </button>
      </div>
    );
}

export default CheckOut
