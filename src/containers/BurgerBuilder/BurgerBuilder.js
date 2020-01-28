import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxlory/Auxlory';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            purchasable: true,
            purchasing: false,
            loading: false
        };
        this.modifyIngredients = this.modifyIngredients.bind(this);
        this.updatePurchasable = this.updatePurchasable.bind(this);
    }

    componentDidMount() {
        // axios.get('/ingredients.json').then(res => {
        //     this.setState({ ingredients: res.data });
        // }).catch(console.log)
    }

    handlePurchasing = () => {
        this.setState({ purchasing: true });
    }

    purchaseContinue = (e) => {
        // const queryParams = [];
        // for (let i in this.props.ings) {
        //     queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.props.ings[i])}`)
        // }
        // queryParams.push('price=' + this.props.price)
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString,
        // })

        this.props.history.push('/checkout')
    }

    cancelPurchase = () => {
        this.setState({ purchasing: false });
    }

    updatePurchasable() {
        this.setState((prevState, props) => {
            const clonedIng = { ...props.ings };
            const sum = Object.keys(clonedIng).map(igKey => clonedIng[igKey]).reduce((sum, el) => {
                return sum + el;
            });
            return { purchasable: sum <= 0 }
        })
    }

    modifyIngredients(event, type) {
        const targetEventName = event.target.name;
        targetEventName === 'More' ? this.props.onIngredientAdded(type) : this.props.onIngredientRemoved(type);
        this.updatePurchasable();
    }

    render() {
        let burger = <Spinner />;
        let orderSummary = null
        if (this.props.ings) {
            burger = <Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    totalPrice={this.props.price}
                    ingredients={this.props.ings}
                    purchasable={this.state.purchasable}
                    purchasing={this.handlePurchasing}
                    modifyIngredients={this.modifyIngredients} />
            </Aux>
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancel={this.cancelPurchase}
                price={this.props.price}
                purchaseContinue={this.purchaseContinue}
            ></OrderSummary>
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (<Aux>
            <Modal show={this.state.purchasing} modalClosed={this.cancelPurchase}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>)
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
        onIngredientRemoved: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
