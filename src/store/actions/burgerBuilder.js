import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const ingredientsFetched = (ingredients) => {
    return {
        type: actionTypes.INGREDIENTS_FETCHED,
        ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}

export const fetchIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json').then(res => {
            dispatch(ingredientsFetched(res.data));
        }).catch(_ => dispatch(fetchIngredientsFailed()));
    }
}