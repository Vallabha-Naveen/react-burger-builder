import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import Aux from '../../../hoc/Auxlory/Auxlory'
const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

const buildControls = props => {
    return <div className={classes.BuildControls}>
        Total cost - <strong>{props.totalPrice}</strong>
        {controls.map((control, i) => {
            return <Aux key={i}>
                <BuildControl
                    label={control.label}
                    isDisabled={props.ingredients[control.type]}
                    type={control.type}
                    modifyIngredients={props.modifyIngredients} />
            </Aux>
        })}
        <button className={classes.OrderButton} onClick={props.purchasing} disabled={props.purchasable}>ORDER NOW</button>
    </div>
}

export default buildControls;