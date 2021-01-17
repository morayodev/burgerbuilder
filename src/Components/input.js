import React from 'react';
import './input.css';

function input(props) {
    let inputbox = null;

    switch (props.elementType) {
      case "input":
        inputbox = (
          <input
            className="InputBox"
            {...props.elementConfig}
                value={props.value}
                onChange={props.change} 
               onChange={props.change} 
          />
        );
        break;
      case "textarea":
        inputbox = (
          <textarea
            className="InputBox"
            {...props.elementConfig}
                value={props.value}
                onChange={props.change}
          />
        );
        break;
       case "select":
        inputbox = (
          <select
            className="InputBox"
            {...props.elementConfig}
                value={props.value}
                onChange={props.change}
            >
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                        
                    </option>
           ))}
          </select>
        );
        break;
      default:
        inputbox = (
          <input
            className="InputBox"
            {...props.elementConfig}
                value={props.value}
                onChange={props.change}
          />
        );
    } 
    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
          {inputbox}
        </div>
    )
}

export default input
