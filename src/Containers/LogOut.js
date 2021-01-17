import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import * as actions from "../store/index";
import {connect} from "react-redux"

class LogOut extends Component {
    componentDidMount() {
        this.props.onLogout();
    }
    render() {
        return <Redirect to="/" />
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLogout:()=>dispatch(actions.logOut())
    }
}
export default connect (null,mapDispatchToProps)(LogOut)
