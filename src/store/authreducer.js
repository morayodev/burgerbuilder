import * as actionTypes from './actionTypes';

const intialState = {
    loading: false,
    token: null,
    error: null,
    userId: null,
    authRedirect:'/',
}

const reducers = (state = intialState, action)=>{
    switch (action.type) {
        case actionTypes.AUTHSTART:
            return {
                ...state,
                loading: true,
                error:null,
            }
        case actionTypes.AUTHSUCCESS:
            return {
              ...state,
              token: action.idToken,
              userId: action.userId,
              loading: false,
              error: null,
            };
        case actionTypes.AUTHFAILED:
            return {
                ...state,
                loading: false,
                error:action.error,
            }
        case actionTypes.LOGOUT:
            return {
              ...state,
              userId: null,
              token: null,
            };
        case actionTypes.SETAUTHREDIRECT:
            return {
              ...state,
              authRedirect:action.path
            };
        
        default:
            return state;  
    }
   
}
export default reducers;