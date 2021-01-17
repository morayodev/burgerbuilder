 import React from 'react'


function OrderSummary(props){
    const ingredientssummary = Object.keys(props.ingredient)
        .map(kim => {
            return (<li key={kim}><span style={{ textTransform: 'capitalize' }}>{kim}</span>:{props.ingredient[kim]}
            </li>)
        });
    return (
      <div>
        <h3>Your Order</h3>
        <p>A deleicious Burger with the following Ingredients:</p>
        <ul>{ingredientssummary}</ul>
        <strong>Total price:{props.total.toFixed(2)}</strong>
        <p>Continue to checkout?</p>
      </div>
    );
}

export default OrderSummary


