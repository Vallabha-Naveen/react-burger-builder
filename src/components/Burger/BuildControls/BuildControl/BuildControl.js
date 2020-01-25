import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} disabled={!props.isDisabled} onClick={(e) => { props.modifyIngredients(e, props.type) }} name="Less">Less</button>
        <button className={classes.More} onClick={(e) => { props.modifyIngredients(e, props.type) }} name="More">More</button>
        <br />
    </div>
);

export default buildControl;