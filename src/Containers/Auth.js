import React, { Component } from 'react';
import Input from '../Components/input';
import "./Auth.css";
import * as actions from '../store/index';
import { connect } from 'react-redux';
import Spinning from "../Components/spinning"; 
import {Redirect} from "react-router-dom"


class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: "true",
          isEmail: "true",
        },
        valid: "false",
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Enter your password",
        },
        value: "",
        validation: {
          required: "true",
          isEmail: "true",
          minLength: "7",
        },
        valid: "false",
      },
    },
    isSignup:"true"
  };
  componentDidMount() {
    if (!this.props.burgerBuilder && this.props.reDirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
     
  }
  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }
  inputChangeHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
      },
    };
    this.setState({controls: updatedControls });
  };
  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };
  switchAuthModeHandler = () => {
    this.setState({ isSignup:false})
  }
  render() {
    
      const formElementArrary = [];
    for (let key in this.state.controls) {
      formElementArrary.push({
        //key here is the name,street,zipcode etc in orderForm
        id: key,
        //next line means the output of name,street etc or the values in the right hand side
        config: this.state.controls[key],
      });
    }

    let form = formElementArrary.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        change={(event) => this.inputChangeHandler(event, formElement.id)}
      />
    ));
    if (this.props.loading) {
      form=<Spinning/>
    }
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      );
    }
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.reDirectPath}/>;
    }
    return (
      <div className="Auth">
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <button
            className="Button Success btn"
            // disabled={!this.state.formIsValid}
          >
            SUBMIT
          </button>
        </form>
        <button onClick={this.switchAuthModeHandler} className="Button Danger">
          SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
        </button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    burgerBuilder: state.burgerBuilder.bulding,
    reDirectPath:state.auth.authRedirect
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSign) =>
      dispatch(actions.authFetch(email, password, isSign)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirect("/")),
  };
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
