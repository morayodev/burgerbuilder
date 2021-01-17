import React, { Component } from 'react'
import Order1 from "./Order1"
import axios from './axios-order'
import withClass from "./withOrder";
import * as actions from "../store/index";
import { connect } from 'react-redux';
import Spinning from "../Components/spinning"; 
import * as actionTypes from '../store/actionTypes'



class OrderPage extends Component {
//   state = {
//     orders: [],
//     loading: true,
//   };
 

    componentDidMount() {
      this.props.onFetchOrders(this.props.token)
    // axios
    //   .get("/orders.json")
    //   .then((res) => {
    //     //console.log(res.data);
    //     const fetchedOrder = [];
    //     for (let key in res.data) {
    //       fetchedOrder.push({
    //         ...res.data[key],
    //         id: key,
    //       });
    //     }
    //     this.setState({ loading: false, orders: fetchedOrder });
    //   })
    //   .catch((err) => {
    //     this.setState({ loading: false });
    //   });
  }
    render() {
        // let spinning = <Spinning />
        // if (!this.props.loading)
        //     spinning
    return (
      <div>
        {this.props.orders.map(order => (
          <Order1
            key={order.id}
            ingredients={order.ingredients}
                totalprice={order.price}
                click={()=>this.props.onRemovedPerson(order.id)}
                // click={this.props.onDelete}
            //click={this.deleteHandler}
          />
        ))}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        orders: state.actions.orders,
        loading: state.actions.loading,
        token:state.auth.token
    }
    
}
const mapDispatchToProps = (dispatch) => {
    return {
      onFetchOrders: (token) => dispatch(actions.fetOrders(token)),
      onRemovedPerson: (id) => dispatch(actions.deleteHandler(id)),
      //onRemovedPerson: (id) => dispatch({type:actionTypes.DELETE,orderId:id})
    };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withClass(OrderPage, axios));
