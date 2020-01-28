import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     price: 0
    // }

    componentDidMount() {
        // this.setState({
        //     ingredients: {
        //         salad: +this.props.match.params.salad,
        //         bacon: +this.props.match.params.bacon,
        //         cheese: +this.props.match.params.cheese,
        //         meat: +this.props.match.params.meat
        //     }
        // });
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            // param is ['salad', '1']
            if (param[0] === 'price') {
                price = +param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ ingredients, price });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        alert(this.props.match.path)
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let checkoutSummary = null;
        if (this.props.ings) {
            checkoutSummary = <CheckoutSummary
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
                ingredients={this.props.ings} />
        }
        return <div>
            {checkoutSummary}
            <Route
                path={this.props.match.path + 'contact-data'}
                component={ContactData} />
        </div>
    }
}

const mapStateToProps = state => ({
    ings: state.ingredients,
    price: state.totalPrice
})

export default connect(mapStateToProps, null)(Checkout)