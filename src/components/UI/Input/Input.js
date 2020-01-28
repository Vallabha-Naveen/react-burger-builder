import React from 'react';
import classes from './Input.module.css';

const input = props => {
    let inputElement = null;
    const classesArray = [classes.InputElement];
    if (!props.valid && props.shouldValidate && props.touched) {
        classesArray.push(classes.Invalid);
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={classesArray.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;
        case ('textarea'):
            inputElement = <textarea className={classesArray.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;
        case ('select'):
            inputElement = <select className={classesArray.join(' ')} value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map(option => <option key={option.value} value={option.value}>{option.displayValue}</option>)}
            </select>
            break;
        default:
            inputElement = <input className={classesArray.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
    }
    return <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
    </div>
}

export default input;