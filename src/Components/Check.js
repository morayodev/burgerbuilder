import React, { Component } from 'react'
import Contactdata from './Contactdata.js'
import {Route,Redirect} from 'react-router-dom'
import CheckOut from "./checkOut";
import {connect} from 'react-redux'


class Check extends Component {
  // state = {
  //   ingredients: {
  //     salad: 0,
  //     bacon: 0,
  //     cheese: 0,
  //     meat: 0,
  //   },
  //   // ingredients: null,
  //   price: 0,
  // };
  // //using querryparams to pass ingredients from the 1st page to the second page
  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredient = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     if (param[0] === "price") {
  //       price = param[1];
  //     } else {
  //       ingredient[param[0]] = +param[1];
  //     }
  //     this.setState({ ingredients: ingredient, totalPrice: price });
  //   }
  // }
  ContinueHandler = () => {
    //this.props.history.push('/');
    this.props.history.push("/Check/Contact-data");
  };
  CancelHandler = () => {
    this.props.history.goBack();
  };

  render() {
    let sumary = <Redirect to="/"/>;
    if (this.props.ings) {
      const purchasedRedirect=this.props.purchased ? <Redirect to="/"/> : null
      sumary = (
        <div>
          {purchasedRedirect}
          <CheckOut
            ingredientsss={this.props.ings}
            continuePage={this.ContinueHandler}
            cancelPage={this.CancelHandler}
          />
          <Route
            path={this.props.match.path + "/Contact-data"}
            component={Contactdata}
          />
        </div>
      );
    }
    return sumary; 
        //     {/* <Contactdata
        //       ingredientsss={this.state.ingredients}
        //      price={this.state.totalPrice} */}
        // {/* <div><Contactdata/></div> */}
     
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.actions.purchased,
    //price: state.burgerBuilder.totalPrice,
  };
};

export default connect(mapStateToProps)(Check)
