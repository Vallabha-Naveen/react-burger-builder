import React, { Component } from 'react';
import Aux from '../../hoc/Auxlory/Auxlory';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.6,
    cheese: 0.7,
    meat: 1
}
class BurgerBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // ingredients: {
            //     salad: 0,
            //     bacon: 0,
            //     cheese: 0,
            //     meat: 0
            // },
            ingredients: null,
            totalPrice: 4,
            purchasable: true,
            purchasing: false,
            loading: false
        };
        this.modifyIngredients = this.modifyIngredients.bind(this);
        this.updatePurchasable = this.updatePurchasable.bind(this);
    }

    componentDidMount() {
        axios.get('/ingredients.json').then(res => {
            this.setState({ ingredients: res.data });
        }).catch(console.log)
    }

    handlePurchasing = () => {
        this.setState({ purchasing: true });
    }

    purchaseContinue = (e) => {
        e.stopPropagation();
        // alert();
        this.setState({ loading: true })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'nav',
                address: {
                    street: 'test street',
                    zipcode: '12345',
                    country: 'India'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order).then(response => {
            console.log(response);
            this.setState({ loading: false, purchasing: false });
        }).catch(err => {
            console.log(err);
            this.setState({ loading: false, purchasing: false });
        });
    }

    cancelPurchase = () => {
        this.setState({ purchasing: false });
    }

    updatePurchasable() {
        this.setState((prevState, props) => {
            const clonedIng = { ...prevState.ingredients };
            const sum = Object.keys(clonedIng).map(igKey => clonedIng[igKey]).reduce((sum, el) => {
                return sum + el;
            });
            return { purchasable: sum <= 0 }
        })
    }

    modifyIngredients(event, type) {
        const targetEventName = event.target.name;

        this.setState((prevState, props) => {
            return {
                ingredients: {
                    ...prevState.ingredients,
                    [type]: (
                        targetEventName == 'More' ?
                            ++prevState.ingredients[type] : --prevState.ingredients[type])
                },
                totalPrice: (targetEventName == 'More' ?
                    (+prevState.totalPrice + INGREDIENT_PRICES[type]).toFixed(2) :
                    (+prevState.totalPrice - INGREDIENT_PRICES[type]).toFixed(2))

            }
        });
        this.updatePurchasable();
    }
    render() {
        let burger = <Spinner />;
        let orderSummary = null
        if (this.state.ingredients) {
            burger = <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls totalPrice={this.state.totalPrice}
                    ingredients={this.state.ingredients}
                    purchasable={this.state.purchasable}
                    purchasing={this.handlePurchasing}
                    modifyIngredients={this.modifyIngredients} />
            </Aux>
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancel={this.cancelPurchase}
                price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
// export default (BurgerBuilder);
