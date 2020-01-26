import React from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

export default class ContactData extends React.Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
            this.setState({ loading: false });
            this.props.history.push('/');
        }).catch(err => {
            console.log(err);
            this.setState({ loading: false });
        });
    }
    render() {
        let form = (<form>
            <input className={classes.Input} name="name" placeholder="your name" />
            <input className={classes.Input} name="email" placeholder="your email" />
            <input className={classes.Input} name="street" placeholder="your street" />
            <input className={classes.Input} name="postal" placeholder="your postal" />
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter details</h4>
                {form}
            </div>
        )
    }
}