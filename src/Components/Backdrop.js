 import React from 'react'
 import './Backdrop.css'

const  Backdrop=(props)=> (
      
            props.showing ? <div className="Backdrop" onClick={props.clicking}></div> : null

            
      
 )
 

export default Backdrop
