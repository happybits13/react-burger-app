import React, { Component } from 'react'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'



class Layout extends Component{
    state={
        showSideDrawer: true
    };

    closeSideDrawerHandler = () => {
        this.setState({showSideDrawer: false});
    }

    // openSideDrawerHandler = () => {
    //     this.setState({showSideDrawer: true});
    // }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
                return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render(){
        return(
            <React.Fragment>
            <Toolbar
                opened={this.sideDrawerToggleHandler}
            ></Toolbar>        
            <SideDrawer 
                closed={this.closeSideDrawerHandler} 
                show={this.state.showSideDrawer}> 
            </SideDrawer>
            <main className={classes.Content}>
                {this.props.children}
            </main>
            </React.Fragment>
        );
    }
}

export default Layout;