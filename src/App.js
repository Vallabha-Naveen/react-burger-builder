import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions';


class App extends React.Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {

    let routes = <Switch>
      <Route path="/" exact component={BurgerBuilder} />
      <Route path='/auth' component={Auth} />
      <Redirect to="/" />
    </Switch>
    if (this.props.isAuthenticated) {
      routes = <Switch>
        {/* <Route path='/auth' component={Auth} /> */}
        <Route path="/orders" exact component={Orders} />
        <Route path="/checkout/" component={Checkout} />
        <Route path='/logout' component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    }
    return (
      <BrowserRouter>
        <div>
          <Layout>
            {routes}
            {/* <BurgerBuilder /> */}
          </Layout>
        </div>
      </BrowserRouter >
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
