import React, { Fragment } from 'react'
import Backdrop from './Backdrop'
import './Modal.css'
import './Button.css'


const Modal = (props) => {
  
  return (
    <Fragment>
      <Backdrop showing={props.showing} clicking={props.closed} />
      <div
        className="Modal"
        style={{
          transform: props.showing ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.showing ? "1" : "0 ",
        }}
      >
        {/* <h3>Your Order</h3>
        <p>A deleicious Burger with the following Ingredients:</p>
        <ul>{ingredientssummary}</ul>
          <p>Continue to checkout?</p>  */}

        {props.children}
        <button className="Button Danger" onClick={props.cancelitems}>
          CANCEL
        </button>
        <button className="Button Success" onClick={props.continueitem}>
          CONTINUE
        </button>
      </div>
    </Fragment>
  );

}

export default Modal
