import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import Auxilary from '../../../hoc/Auxilary'
import Backdrop from '../../UI/Backdrop/Backdrop'



const sideDrawer = (props)=>{
    let attachedClass=[classes.SideDrawer, classes.Close]
    if(props.open){
        attachedClass=[classes.SideDrawer, classes.Open]
    }

    return(
        <Auxilary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClass.join(' ')} >
            <div style={{height:'20%'}}>
            <Logo/>
            </div>
            
            <nav>
                <NavigationItems
                 isAuthenticated={props.isAuth}/>
            </nav>

        </div>
        </Auxilary>
    )
}

export default sideDrawer;