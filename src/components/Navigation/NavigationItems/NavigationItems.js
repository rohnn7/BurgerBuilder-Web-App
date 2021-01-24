import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'


const navigationItems = (props) =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        {props.isAuthenticated?<NavigationItem link="/Orders">Orders</NavigationItem>:null}
        {!props.isAuthenticated
        ? <NavigationItem link="/Auth">Authenticate</NavigationItem>
        : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
)

export default navigationItems;