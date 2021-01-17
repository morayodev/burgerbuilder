import * as actionTypes from "./actionTypes";
import axios from "axios";


export const authStart =() => {
    return {
        type:actionTypes.AUTHSTART, 
    }
}
export const authSuccess = (userId,token) => {
  return {
    type: actionTypes.AUTHSUCCESS,
    idToken: token,
    userId: userId,
  };
};
export const authFailed = (error) => {
  return {
      type: actionTypes.AUTHFAILED,
      error:error
  };
};
export const logOut = () => {
  return {
    type:actionTypes.LOGOUT
  }
}
export const logOutAsy= (expiredTime)=>{
  return dispatch => {
    setTimeout(() => {
      dispatch(logOut())
    }, expiredTime *1000);
    
  }
}
export const setAuthRedirect = (path) => {
  return {
    type: actionTypes.SETAUTHREDIRECT,
    path:path
  };
}
export const authFetch = (email,password,isSign) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken:true,
        }
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEFJMPKvdITfI5x9MyFXkJsXO1pvNQqiw";
      if (!isSign) {
         url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEFJMPKvdITfI5x9MyFXkJsXO1pvNQqiw";
       }
        axios.post(url,authData)
          .then(response => {
           // console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(logOutAsy(response.data.expiresIn));
          })
          .catch((err) => {
            //console.log(err);
            dispatch(authFailed(err.response.data.error));
          });
       
        
    }
  
  
}
