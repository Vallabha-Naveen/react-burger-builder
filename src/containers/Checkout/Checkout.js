import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     price: 0
    // }

    // constructor(props) {
    //     super(props);
    //     console.log('checkout constructor ', this.props.purchased)
    //     this.props.onPurchaseInit();
    // }
    componentWillUnmount() {
        console.log('checkout componentWillUnmount ', this.props.purchased)
        this.props.onPurchaseInit();
    }
    componentDidMount() {
        // this.setState({
        //     ingredients: {
        //         salad: +this.props.match.params.salad,
        //         bacon: +this.props.match.params.bacon,
        //         cheese: +this.props.match.params.cheese,
        //         meat: +this.props.match.params.meat
        //     }
        // });
        // const query = new URLSearchParams(this.props.location.search);
        // const ingredients = {};
        // let price = 0;
        // for (let param of query.entries()) {
        //     // param is ['salad', '1']
        //     if (param[0] === 'price') {
        //         price = +param[1];
        //     } else {
        //         ingredients[param[0]] = +param[1];
        //     }
        // }
        // this.setState({ ingredients, price });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        console.log('checkout render start', this.props.purchased)
        let checkoutSummary = <Redirect to="/" />;
        if (this.props.ings) {
            const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null

            checkoutSummary = <>
                {purchaseRedirect}
                <CheckoutSummary
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.props.ings} />
                <Route
                    path={this.props.match.path + 'contact-data'}
                    component={ContactData} />
            </>
        }
        console.log('checkout render end', this.props.purchased)
        return checkoutSummary;
    }
}

const mapStateToProps = state => ({
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
});

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseInit: _ => dispatch(actionTypes.puchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)