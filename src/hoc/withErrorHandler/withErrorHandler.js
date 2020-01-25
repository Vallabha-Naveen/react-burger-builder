import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxlory/Auxlory';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component {
        state = {
            error: null
        }
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(null, err => {
                this.setState({ error: err });
                console.error(err)
            })
        }

        componentWillUnmount() {
            console.log('ooooooooo')
            axios.interceptor.request.eject(this.reqInterceptor);
            axios.interceptor.request.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error && this.state.error.message}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
};

export default withErrorHandler;