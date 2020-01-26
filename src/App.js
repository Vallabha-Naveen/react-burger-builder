import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Layout>
          <Switch>
            <Route path="/orders" exact component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
            {/* <Route path="/checkout/:salad/:bacon/:meat/:cheese" exact component={Checkout} /> */}
            <Route path="/checkout/" component={Checkout} />
          </Switch>
          {/* <BurgerBuilder /> */}
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
