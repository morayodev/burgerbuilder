import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware,compose,combineReducers} from 'redux'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import reducer from "./store/reducer";
import orderReducer from './store/order1'
import thunk from 'redux-thunk';
import authReducer from './store/authreducer';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  burgerBuilder: reducer,
  actions: orderReducer,
  auth:authReducer,
});


const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
 