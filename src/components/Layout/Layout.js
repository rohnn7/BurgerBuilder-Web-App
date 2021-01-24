import React from 'react';
import Auxilary from '../../hoc/Auxilary';
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import { Component } from 'react';
import {connect} from 'react-redux'

/*
    When App uses <Layout> component, everything within opening and closing tag comes as props.childeren
    then layout again calls <Auxilary>, it calls auxilary and within opening and closing tag comes
    as props.childeren, and hence there by that props.children is basically being rendered in App.js
 */
class Layout extends Component{

    state={
        showSideDrawer:true
    }

    sideDrawerClosedHandler=() =>{
        this.setState({
            showSideDrawer:false
        })
    }
    sideDrawerToggleHandler=() =>{
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer};
        })
    }

    render(){
        return(
            <Auxilary>
        <Toolbar Toggle={this.sideDrawerToggleHandler} 
                isAuth={this.props.isAuthenticated}
        />
        <SideDrawer closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer}
            isAuth={this.props.isAuthenticated}
        />
        <br/><br/>
        <main className={classes.Content}>
            {this.props.children}
        </main>
    </Auxilary>
    
        )
    }
}

const mapStateToProps = state =>{
    return{
        isAuthenticated:state.auth.token !==null
    }
}

export default connect(mapStateToProps)(Layout);