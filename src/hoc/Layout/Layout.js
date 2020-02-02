import React from 'react';
import { connect } from 'react-redux'
import Aux from '../Auxlory/Auxlory';
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
    state = {
        showSideDrawer: false
    }
    // sideDrawerClosedHandler = () => {
    //     this.setState({ showSideDrawer: false });
    // }

    sideDrawerToggleHandler = () => {
        this.setState(prevState => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
        // this.setState({ showSideDrawer: true });
    }

    render() {
        return (
            <Aux>
                <Toolbar openSideDrawer={this.sideDrawerToggleHandler} isAuth={this.props.isAuthenticated}></Toolbar>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerToggleHandler}
                    isAuth={this.props.isAuthenticated}></SideDrawer>
                <div>toolbar, sidebar, backdrop</div>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return { isAuthenticated: state.auth.token !== null }
}
export default connect(mapStateToProps)(Layout);