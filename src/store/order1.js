import * as actionTypes from './actionTypes';

const initialState = {
    orders: [],
    loading: false,
   purchased:false

}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASEINIT:
            return {
              ...state,
              purchased: false,
            };
        case actionTypes.PURCHASEBURGERLOADING:
            return {
                ...state,
                loading:true
            }
        case actionTypes.PURCHASEBURGER:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
                 
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                 purchased:true
                
        };
      case actionTypes.PURCHASEBURGERFAILED:
            return {
                ...state,
                loading:false
            };
        case actionTypes.FETCHORDERSTART:
            return {
                ...state,
                loading:true
                
            }
        case actionTypes.FETCHORDERSUCCESS:
            return {
                ...state,
                order: action.orders,
                loading:false
                
            };
        case actionTypes.FETCHORDERFAIL:
            return {
                ...state,
                loading: false,
                
                
            }
        case actionTypes.DELETE:
            return {
                ...state,
                orders: state.orders.filter(order => order.id !== action.orderId),
                id:action.orderId
            }
        default:
            return state;
    }

    
}
  export default reducer;