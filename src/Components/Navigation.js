import React from 'react'
import './Navigation.css'
import {NavLink} from 'react-router-dom'
//import Navigationli from './Navigationli'
function Navigation(props) {
    return (
      <div>
        <ul className="NavigationItems">
          <li className="NavigationItem ">
            <NavLink
              className="NavigationItem a"
              to="/"
              exact
              activeClassName="active"
            >
              Burger Builder
            </NavLink>
          </li>
          <li className="NavigationItem ">
            {!props.isAuthenticat ? 
              <NavLink
                className="NavigationItem a"
                to="/auth"
                activeClassName="active"
              >
                Authenticate 
              </NavLink>
             : 
              <NavLink
                className="NavigationItem a"
                to="/LogOut"
                activeClassName="active"
              >
              LogOut
              </NavLink>
            }
          </li>
          <li className="NavigationItem">
            {props.isAuthenticat ?
              <NavLink
                className="NavigationItem a"
                activeClassName="active"
                to="/OrderPage"
              >
                Checkout
            </NavLink>
              : null
            }
          </li>
        </ul>
        {/* <ul className="NavigationItems">
          <Navigationli link="/">Burger Builder</Navigationli>
          <Navigationli link="/">Checkout</Navigationli>
        </ul> */}
      </div>
    );
}

export default Navigation
