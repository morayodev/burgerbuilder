import React from 'react'
import './BuildInner.css'
function BuildInner(props) {
    return (
        <div className="BuildInner">
            <div className="Label">{props.ingredientlabel}</div>
            <button className="btn1" onClick={props.removed}>Less</button>
            <button className="btn2" onClick={props.add}>More</button>
        </div>
    )
}

export default BuildInner
