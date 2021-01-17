import React from 'react'
import hero from './hero6.jpg';
import './Logo.css'
const Logo =(props)=> (
    
        <div className="Logo" style={{height:props.height}}>
            <img src={hero} alt="my hero"/>
        </div>
    )


export default Logo 
