import * as actionTypes from './actionTypes';
import axios from "../Components/axios-order";

export const addIngredient = (name) => {
    return {
      type: actionTypes.ADDINGREDIENT,
     ingredientName: name
    };
}
export const deleteIngredient = (name) => {
  return {
    type: actionTypes.DELETEINGREDIENT,
    ingredientName:name,
  };
};
//to catch an error
export const fetchIng = () => {
    return {
        type: actionTypes.FAILED,
        
    }
}
//syn code action
export const setIngredients = (ing) => {
    return {
        type: actionTypes.SETINGREDIENT,
       ingredient :ing
    }
}


//asyn code action
export const fetchIngredients = () => {
    return dispatch => {
      axios.get("https://myreact-e6be0.firebaseio.com/ingredients.json")
        .then((response) => {
                 // console.log(response.data);
               dispatch(setIngredients(response.data));
             })
             .catch((error) => {
               dispatch(fetchIng());
             }); 
    }
}