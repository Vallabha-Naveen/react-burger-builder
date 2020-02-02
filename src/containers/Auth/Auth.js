import React from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as action from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends React.Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your email'
                },
                value: 'test@test.com',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your pwd'
                },
                value: 'abcdef',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true
    };

    checkValidity(value, rules) {
        if (!rules) {
            return true;
        }
        let isValid = false;
        if (rules.required) {
            isValid = value.trim() !== '';
        }
        return isValid;
    }

    inputChanged = (e, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.controls };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
        updatedFormElement.value = e.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        this.setState({ controls: updatedOrderForm, formIsValid });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = (e) => {
        e.preventDefault()
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup };
        })
    }

    render() {
        if (this.props.isAuthenticated && !this.props.isBurgerBuilt) {
            return <Redirect to='/' />
        } else if (this.props.isAuthenticated && this.props.isBurgerBuilt) {
            return <Redirect to="/checkout" />
        }
        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let actionState = <Spinner />
        if (!this.props.loading) {
            actionState = <>
                <Button btnType="Success">SUBMIT</Button>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>Switch to {this.state.isSignup ? 'Sign-in' : 'Sign-up'}</Button>
            </>
        }
        let errMsg = null;
        if (this.props.error) {
            errMsg = <p>{this.props.error.message}</p>
        }
        let form = (<form onSubmit={this.onSubmit}>
            {
                formElementArray.map(formEle => {
                    return <Input key={formEle.id}
                        valid={formEle.config.valid}
                        elementType={formEle.config.elementType}
                        elementConfig={formEle.config.elementConfig}
                        shouldValidate={formEle.config.validation}
                        changed={(e) => this.inputChanged(e, formEle.id)}
                        touched={formEle.config.touched}
                        value={formEle.config.value} />
                })
            }

            {actionState}
            {errMsg}
        </form>);
        return (<div>
            {form}
        </div>)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, pwd, isSignup) => dispatch(action.auth(email, pwd, isSignup))
    }
}

const isBurgerBuilt = (ingredients) => {
    return ingredients &&
        (ingredients.salad > 0 ||
            ingredients.cheese > 0 ||
            ingredients.meat > 0 ||
            ingredients.bacon > 0)
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token,
        isBurgerBuilt: isBurgerBuilt(state.burgerBuilder.ingredients)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)