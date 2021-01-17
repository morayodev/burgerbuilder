import React, { Component } from 'react'
import "./Button.css"; 
import './Contactdata.css';
//import CheckOut from "./CheckOut";
import axios from "../Components/axios-order";
import Input from './input'
import { connect } from 'react-redux';
import * as actions from "../store/index"
import withClass from "./withOrder";
import Spinning from "./spinning"; 

class Contactdata extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation: {
          required: "true",
        },
        valid: "false",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: "true",
        },
        valid: "false",
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
        validation: {
          required: "true",
          minLength: "5",
          maxLength:"5",
        },
        valid: "false",
        
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: "true",
        },
        valid: "false",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mail",
        },
        value: "",
        validation: {
          required: "true",
        },
        valid: "false",
      },
      deliveryMode: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        valid: "true",
        validation:{},
      },
    },
    formIsValid:'false',

    // loading: "false",
  };
  orderClicked = (event) => {
    event.preventDefault();
    //console.log(this.props.ingredientsss);
    //alert("You want to get more items ?");
   // this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
      
    const booking = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData:formData
    }
    this.props.onPurchsed(booking)
    // axios
    //   .post("/orders.json", booking)
    //   .then((response) => {
    //     // console.log(response)
    //     this.setState({ loading: false });
    //     this.props.history.push('/')
    //   })
    //   .catch(
    //     (error) => {
    //       this.setState({ loading: false });
    //     } //console.log(error)
    //   );
  };
  changeHandler = (event, inputIdentifier) => {
    // console.log(event.target.value);
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    //console.log(updatedFormElement);
    let FormIsValid = true;
    for (let inputIdentifier in updatedOrderForm)
      FormIsValid = updatedOrderForm[inputIdentifier].valid && FormIsValid
   // console.log(FormIsValid);
      this.setState({ orderForm: updatedOrderForm, formIsValid: FormIsValid });
  };
  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) { 
      isValid = value.trim() !== '' && isValid;
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

  render() {
    // let form = ( );
    

    //looping into orderForm converting it to an array
    const formElementArrary = [];
    for (let key in this.state.orderForm) {
      formElementArrary.push({
        //key here is the name,street,zipcode etc in orderForm
        id: key,
        //next line means the output of name,street etc or the values in the right hand side
        config: this.state.orderForm[key],
      });
    }
     let form=formElementArrary.map((formElement) => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              change={(event) => this.changeHandler(event, formElement.id)}
       />
       
     ))
    if (this.props.loading) {
      form = <Spinning />
    }
     
    
    return (
      <div className="Contactdata">
        <h4>Enter you data</h4>
        <form onSubmit={this.orderClicked}>
          {form}
          {/* <Input 
            inputtype="input"
            type="text"
            name="email"
            placeholder="Your Email"
            // value={this.state.name}
          />
          <Input
            inputtype="input"
            type="text"
            name="street"
            placeholder="Your Street"
            // value={this.state.name}
          />
          <Input
            inputtype="input"
            type="text"
            name="postal"
            placeholder="Your PostCode"
            // value={this.state.name}
          /> */}
          <button
            className="Button Success"
            // disabled={!this.state.formIsValid}
          >
            ORDER
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.actions.loading,
    // token:state.auth.token
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onPurchsed: (orderData) =>
      dispatch(actions.purchaseBurgerStart(orderData)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withClass(Contactdata,axios));
