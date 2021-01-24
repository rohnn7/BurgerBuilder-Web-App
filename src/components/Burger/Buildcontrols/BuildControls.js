import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

/*
    This funtion is used to build whole tool bar 
    1. we make a array containing all components/column of toolbar
    2. then we traverse through that array and assign JSx
*/

const controls = [
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'},
    
];

const buildControls = props =>(
    <div className={classes.BuildControls}>
        <p>Price:<strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
             key={ctrl.label}
             label={ctrl.label}             
             added = {()=>props.ingredientAdded(ctrl.type)}
             removed = {()=>props.ingredientremoved(ctrl.type)}
             disabled={props.disabled[ctrl.type]}/>
        ))}
        {props.isAuth 
        ? <button onClick={props.ordered} className={classes.OrderButton} disabled={!props.purchasable}>ORDER NOW</button>
        : <button onClick={props.ordered} className={classes.OrderButton} disabled={!props.purchasable}>SIGNUP</button>}
    </div>
);



export default buildControls