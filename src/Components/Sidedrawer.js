import React, { Fragment } from "react";
import "./Sidedrawer.css";
import Logo from "./Logo";
import Navigation from "./Navigation";
import Backdrop from "./Backdrop";


function Sidedrawer(props) {
    // let classes = [];
    // if (props.closed)
    //     classes.push("Close");
    // if (props.open)
    //     classes.push("Open")
  
  //console.log(props);
  // let attach = [classes.Sidedrawer, classes.Close];
  // if (props.open) {
  //   attach=[classes.Sidedrawer, classes.Open]
  // }
  return (
    <Fragment>
      <Backdrop showing={props.open} clicking={props.closed} /> 
     
      <div className={(props.open ? "Open" : "Close")+ " SideDrawer"} onClick={props.closed}>
        <Logo height="11%"></Logo>
        <Navigation isAuthenticat={props.isAuth}/>
      </div>
    </Fragment>
  );
   
}

export default Sidedrawer;
