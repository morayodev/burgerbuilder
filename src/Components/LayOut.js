import React, { Component} from 'react'
import './layOut.css'
import Toolbar from "./Toolbar"
import Sidedrawer from './Sidedrawer'
import { connect } from "react-redux"

class LayOut extends Component{
    state = {
         showSideDrawer:false
     }
    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });   
    }
    menuRemover = () => {
        this.setState({ showSideDrawer :true});
    }
    // menuRemover = () => {
    //     this.setState((prevState) => {
    //         return { showSideDrawer: !prevState.showSideDrawer };
    //     });
    // }
   
    render() {
    // console.log(this.showSideDrawer)
       // console.log(this.menuRemover)
       return (
         <div>
           <Toolbar
             isAuth={this.props.isAuthenticated}
             rayo={this.menuRemover}
           ></Toolbar>
           <Sidedrawer
             isAuth={this.props.isAuthenticated}
             closed={this.sideDrawerClosedHandler}
             open={this.state.showSideDrawer}
           />
           <main className="Content">{this.props.children}</main>
         </div>
       );  
    }
   
}
const mapStateToProps = state => {
  return {
    isAuthenticated:state.auth.token !==null
  }
}

export default connect(mapStateToProps)(LayOut)