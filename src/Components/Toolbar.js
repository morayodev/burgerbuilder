import React from 'react'
import './Toolbar.css'
import Logo from './Logo'
import Navigation from "./Navigation"
import Menu from './Menu'

function Toolbar(props) {
    return (
      <div className="Toolbar">
        <Menu kim={props.rayo}/>
        <Logo height="80%"></Logo>
        <div className="Desktop">
          <Navigation isAuthenticat={props.isAuth}/>
        </div>
      </div>
    );
}

export default Toolbar
