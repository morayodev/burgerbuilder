import * as actionTypes from './actionTypes'
import axios from "../Components/axios-order";

export const purchaseBurger=(id,orderData) => {
    return{
        type: actionTypes.PURCHASEBURGER,
        orderId: id,
        orderData:orderData
    }
   
}
export const purchaseBurgerFailed=(error)=> {
  return {
      type: actionTypes.PURCHASEBURGERFAILED,
      error:error
  };
};
export const purchaseBurgerLoading = () => {
    return {
        type: actionTypes.PURCHASEBURGERLOADING,
        
    };
}
//asyn code
export const purchaseBurgerStart = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerLoading());
         axios
           .post("/orders.json", orderData)
           .then((response) => {
              // console.log(response.data)
               dispatch(purchaseBurger(response.data.name, orderData));
             
           })
           .catch(
             (error) => {
              dispatch(purchaseBurgerFailed(error));
             } //console.log(error)
           );
        
    }
    
}
export const purchaseInIt = () => {
    return {
      type: actionTypes.PURCHASEINIT,
    };
    
} 
export const fetchOrderStart =() => {
    return {
        type: actionTypes.FETCHORDERSTART,
       
    }
}
export const fetchOrderSuccess = (order) => {
  return {
    type: actionTypes.FETCHORDERSUCCESS,
    order: order,
  };
};
export const fetchOrderFail = (error) => {
  return {
    type: actionTypes.FETCHORDERFAIL,
    error: error,
  };
};
export const deleteHandler =(id) => {
    return {
        type:actionTypes.DELETE,
        orderId: id,
        
    }
}
//async code
export const fetOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrderStart());
          axios.get("/orders.json?auth=" + token)
            .then((res) => {
              //console.log(res.data);
              const fetchedOrder = [];
              for (let key in res.data) {
                fetchedOrder.push({
                  ...res.data[key],
                  id: key,
                });
              }
                   dispatch(fetchOrderSuccess(fetchedOrder));
            })
              .catch((err) => {
                dispatch(fetchOrderFail(err));
            });
    }
}