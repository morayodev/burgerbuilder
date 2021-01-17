import React from 'react'
import './Order1.css'

const Order1 = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName, amount: props.ingredients
            [ingredientName]
        }
        );
    }
    const ingredientOutput = ingredients.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize', display: "inline-block",
                margin: "0 8px",
                border: '1px solid #ccc',
            padding:"5px"}}
            key={ig.name}>{ig.name} ({ig.amount})</span>
    })
    return (
      <div className="Order1">
        <p>Ingredients:{ingredientOutput}</p>
        <p>
          Price:
          <strong>USD {Number.parseFloat(props.totalprice).toFixed(2)}</strong>
        </p>
        <button onClick={props.click}>DELETE</button>
      </div>
    );
 
}


export default Order1