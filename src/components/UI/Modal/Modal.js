import React from 'react';
import classes from './Modal.module.css'
import Auxilary from '../../../hoc/Auxilary'
import Backdrop from '../Backdrop/Backdrop'
/*
    Modal is simple Modals of Bootstrap but here we created our own css
    and then it renders the children
*/

const modal = (props) => (
    <Auxilary>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div className={classes.Modal}
        style={{transform: props.show ? 'translateY(0)':'translateY(-100vh)',
        opacity:  props.show ? '1' : '0'}}
    >
        {props.children}
    </div>
    </Auxilary>
);

export default modal;






