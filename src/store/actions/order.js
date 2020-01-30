import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = orderData => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData).then(response => {
            dispatch(purchaseBurgerSuccess(response.data, orderData));
        }).catch(err => {
            dispatch(purchaseBurgerFailed(err));
        });
    }
}

export const puchaseInit = _ => {
    return { type: actionTypes.PUCHASE_INIT };
}

export const fetchOrdersSuccess = orders => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
}

export const fetchOrdersFail = error => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    }
}

export const fetchOrdersStart = error => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT
    }
}

export const fetchOrders = _ => {
    return dispatch => {
        axios.get('/orders.json').then(res => {
            const fetchedData = [];
            for (let key in res.data) {
                fetchedData.push({ ...res.data[key], id: key });
            }
            dispatch(fetchOrdersSuccess(fetchedData));
            // this.setState({ orders: fetchedData, loading: false });
        }).catch(err => {
            dispatch(fetchOrdersFail(err));
            // this.setState({ loading: false })
        })
    }
}