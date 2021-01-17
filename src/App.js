import React, { Component } from 'react'
import Layout from './Components/LayOut'
import BurgerBuilder from './Containers/BurgerBuilder'
import Check from './Components/Check'
import { Route, Switch } from 'react-router-dom'
import OrderPage from "./Components/OrderPage";
import Auth from './Containers/Auth';
import LogOut from './Containers/LogOut';


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/Check" component={Check} />
            <Route path="/auth" component={Auth} />
            <Route path="/OrderPage" component={OrderPage} />
            <Route path="/LogOut" component={LogOut}/>
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
        {/* <Layout>
          <BurgerBuilder /
          >
          / <Check/> 
       </Layout>  */}
      </div>
    );
  }
}

export default App


