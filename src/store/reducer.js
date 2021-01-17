import * as actionTypes from "./actionTypes"

const intialState = {
//   ingredients: {
//     salad: 0,
//     bacon: 0,
//     cheese: 0,
//     meat: 0,
//   },
   ingredients:null,
   totalPrice: 0,
  error: false,
  building:false,

};
const INGREDIENTPRICES = {
  salad: 0.5,
  cheese: 0.6,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state = intialState, action) => {
    switch (action.type) {
      case actionTypes.ADDINGREDIENT:
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.ingredientName]:
              state.ingredients[action.ingredientName] + 1,
          },
          totalPrice:
            state.totalPrice + INGREDIENTPRICES[action.ingredientName],
          building:true,
        };
      case actionTypes.DELETEINGREDIENT:
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.ingredientName]:
              state.ingredients[action.ingredientName] - 1,
          },
          totalPrice:
            state.totalPrice - INGREDIENTPRICES[action.ingredientName],
          building: true,
        };
        case actionTypes.SETINGREDIENT:
            return {
              ...state,
              ingredients: action.ingredient,
              totalPrice: 0,
              error: false,
              building: false,
            };
        case actionTypes.FAILED:
            return {
              ...state,
              error: true,
            };
      default:
        return state;
    }
    
}
export default reducer;