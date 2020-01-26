import React from 'react';
import Order from './Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends React.Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        axios.get('/orders.json').then(res => {
            console.log(res.data);
            const fetchedData = [];
            for (let key in res.data) {
                fetchedData.push({ ...res.data[key], id: key });
            }
            this.setState({ orders: fetchedData, loading: false });
        }).catch(err => {
            this.setState({ loading: false })
        })
    }
    render() {
        return (
            <div>
                {this.state.orders.map(order => <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />)}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);