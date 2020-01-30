import React from 'react';
import Aux from '../../../hoc/Auxlory/Auxlory';
import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component {
    componentWillUpdate() {
        // console.log('orderSummary will update');
    }

    componentDidMount() {
        // console.log('orderSummary componentDidMount');
    }

    componentWillUnmount() {
        // console.log('orderSummary componentUnMount');
    }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return <li key={igKey}><span>{igKey}</span>:{this.props.ingredients[igKey]}</li>
        })
        return (
            <Aux>
                <h3>Your order</h3>
                <p>Ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price} </strong></p>
                <Button btnType="Danger" clicked={this.props.purchaseCancel}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux >
        )

    }
}

export default OrderSummary