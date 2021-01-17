import React from 'react'
import './BuildControls.css'
import BuildInner from './BuildInner'




 const controls = [
   { ingredientlabel: "Salad", type: "salad" },
  { ingredientlabel: "Bacon", type: "bacon" },
  { ingredientlabel: "Cheese", type: "cheese" },
  { ingredientlabel: "Meat", type: "meat" },
];
const BuildControls=(props)=> {
    return (
      <div className="BuildControls">
        <p>
          <strong>Current price:{props.price.toFixed(2)}</strong>
        </p>
        {controls.map((morayo) => (
          <BuildInner
            key={morayo.ingredientlabel}
            ingredientlabel={morayo.ingredientlabel}
            removed={() => props.clicked(morayo.type)}
            add={() => props.addIn(morayo.type)}
          />
        ))}
        <button
          className="OrderButton"
          disabled={!props.purchesable}
          onClick={props.buying}
        >
          {props.isAuthed ? "ORDER NOW" : "SIGN IN"}
        
        </button>

        {/*  instead of writting one by by preferable to map it<BuildInner ingredientlabel="Salad" />
        <BuildInner ingredientlabel="Bacon" />
        <BuildInner ingredientlabel="Cheese" /> 
        <BuildInner ingredientlabel="Meat" /> */}
      </div>
    );
}

export default BuildControls
