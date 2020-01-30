import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    // ingredients: {
    //     salad: 0,
    //     cheese: 0,
    //     meat: 0,
    //     bacon: 0
    // },
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.6,
    cheese: 0.7,
    meat: 1
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            };
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, updatedState);
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.INGREDIENTS_FETCHED:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    ...action.ingredients
                },
                totalPrice: 4,
                error: false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default reducer;