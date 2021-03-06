import React from 'react';
import { connect } from 'react-redux';
import Order from './Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class Orders extends React.Component {
    // state = {
    //     orders: [],
    //     loading: true
    // }
    componentDidMount() {
        // axios.get('/orders.json').then(res => {
        //     const fetchedData = [];
        //     for (let key in res.data) {
        //         fetchedData.push({ ...res.data[key], id: key });
        //     }
        //     this.setState({ orders: fetchedData, loading: false });
        // }).catch(err => {
        //     this.setState({ loading: false })
        // })

        this.props.initOrders(this.props.token, this.props.userId);
    }
    render() {
        return (
            <div>
                {this.props.orders.map(order => <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        error: state.order.error,
        userId: state.auth.userId,
        token: state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        initOrders: (token, userId) => dispatch(actionTypes.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));