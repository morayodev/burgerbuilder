import React, { Component, Fragment } from "react";
import Burger from "../Components/Burger";
import BuildControls from "../Components/BuildControls";
//import BurgerIngredients from "../Components/BurgerIngredients";
import Modal from "../Components/Modal";
//import Toolbar from "../Components/Toolbar"
import OrderSummary from "./OrderSummary";
import Spinning from "../Components/spinning"; 
//import Sidedrawer from "../Components/Sidedrawer";
import withClass from "../Components/withOrder"
import axios from "../Components/axios-order";
import { connect } from 'react-redux';
import * as burgerBuilderAction from "../store/index"
import { Redirect } from "react-router-dom";


// const INGREDIENTPRICES = {
//   salad: 0.5,
//   cheese: 0.6,
//   meat: 1.3,
//   bacon: 0.7,
// };
export class BurgerBuilder extends Component {
  state = {
    // ingredients: {
    //   salad: 0,
    //   bacon: 0,
    //   cheese: 0,
    //   meat: 0,
    // },
   // orders:[], 
   // ingredients:null,
    totalPrice: 0,
    purchasing: false,
    // loading: false,
    // error:false,
    //showSideDrawer: false,
  };
  //this axios is to give the burger ingredients from the start
  componentDidMount() {
    this.props.onSetIngedient();
  //  axios
  //    .get("https://myreact-e6be0.firebaseio.com/ingredients.json")
  //    .then((response) => {
  //      this.setState({ ingredients: response.data });
  //    })
  //    .catch((error) => {
  //      this.setState({ error: true });
  //    });
  }
   updatePurchesable(ingredients) {
    const sum = Object.keys(ingredients)
      .map((momo) => {
        return ingredients[momo];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
     return sum > 0;
  }
  // addIngredients = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = { ...this.state.ingredients };
  //   //     console.log(updatedIngredients)
  //   updatedIngredients[type] = updatedCount;
  //   //    PRICE CALCULATION
  //   const priceAddition = INGREDIENTPRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;

  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchesable(updatedIngredients);
  // };

  // deleteIngredients = (type) => {
  //   //option one is the right approach or const gg = this.state.persons.slice();
  //   // create a copy
  //   //    const oldCount = this.state.ingredients[type];
  //   //     const gg = { ...this.state.ingredients };
  //   //     const update = oldCount - 1;
  //   // // change it
  //   // gg[type]=update
  //   // // update the state to setstate
  //   // this.setState({ ingredients: gg });
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = { ...this.state.ingredients };
  //   console.log(updatedIngredients);
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENTPRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchesable(updatedIngredients);
  // };
  purchaseHandler = () => {
    if(this.props.isAuthenticated){
       this.setState({ purchasing: true });
    } else {
      this.props.onSetRedirectPath("/Check");
      this.props.history.push('/auth'); 
    
    }
   
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinue = () => {
   // alert("You want to get more items ?");
    // this.setState({loading:true})
    // const booking = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Morayo adelekan',
    //     address: {
    //       street: 'taofeek adelekan cresent',
    //       zipCode: '36674',
    //       country:'Nigeria',
    //     },
    //     email: "morayo@41.com",
    //     deliveryMode:"fastest"
    //   }
    // }
    // axios.post("/orders.json", booking)
    //   .then(response => {
    //     // console.log(response)
    //     this.setState({ loading: false, purchasing:false });
    //   })
    //   .catch(error => {
    //        this.setState({ loading: false, purchasing:false });
    //   } //console.log(error)
    //   );


    //using querryparams to pass ingredients from the 1st page to the second page
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    // }
    // queryParams.push('price=' + this.state.totalPrice)
    // const queryString = queryParams.join('&');
    // this.props.history.push({
    //   pathname: '/Check',
    //   search:"?" + queryString
    //      });

    
    //using redux to pass it
    this.props.onInITPurchase(); 
    this.props.history.push('/Check')
 
  }; 
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  }
    
  render() {
   // console.log(this.onIngredientsAdded);
    let order = null;
   
    let burger = this.props.error ? <p>There is an error</p>:<Spinning/>
    if (this.props.ings) {
       burger = (
         <div>
           <Burger ingredient={this.props.ings} />
           <BuildControls
             addIn={this.props.onIngredientsAdded}
             clicked={this.props.onIngredientsDelete}
             price={this.props.price}
             purchesable={this.updatePurchesable(this.props.ings)}
             buying={this.purchaseHandler}
             isAuthed={this.props.isAuthenticated}
           />
         </div>
       );
    
        order = (
          <OrderSummary
            closed={this.purchaseCancelHandler}
            total={this.props.price}
            ingredient={this.props.ings}
          />
        );  
    }
    // if (this.state.loading) {
    //   order = <Spinning />;
    // }
   
    return (
      <Fragment>
        <Modal
        showing={this.state.purchasing}
        cancelitems={this.purchaseCancelHandler}
        continueitem={this.purchaseContinue}
        >
          {order}
        </Modal>
        {burger}
        {/* <Toolbar></Toolbar>
        <Sidedrawer
          closed={this.sideDrawerClosedHandler}
          open={this.state.showSideDrawer}
        /> */}
      </Fragment>
    );
  }
}
const mapStateToProps = (state)=>{
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated:state.auth.token !== null,
 
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientsAdded: (ingName) =>
      dispatch(burgerBuilderAction.addIngredient(ingName)),
    onIngredientsDelete: (ingName) =>
      dispatch(burgerBuilderAction.deleteIngredient(ingName)),
    onSetIngedient: () => dispatch(burgerBuilderAction.fetchIngredients()),
    onInITPurchase: () => dispatch(burgerBuilderAction.purchaseInIt()),
    onSetRedirectPath: (path) => dispatch(burgerBuilderAction.setAuthRedirect(path)),
  };

}
 

 export default connect(
   mapStateToProps,
   mapDispatchToProps
 )(withClass(BurgerBuilder, axios));
//export default BurgerBuilder;
