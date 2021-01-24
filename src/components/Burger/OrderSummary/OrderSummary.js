import React from 'react';
import Auxilary from '../../../hoc/Auxilary'
import Button from '../../UI/Button/Button'
/*
    this is rendered inside a modal. it first take props of ingredients objects.
    then convert it to the list and that list is rendered in JSx
*/

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(igKey =>{
    return(<li key={igKey}><span  style={{textTransform: 'capitalize'}}>{igKey}:</span> {props.ingredients[igKey]}</li>)
    });


    return(
        <Auxilary>
            <h3>Your Order</h3>
            <p>Burger with Following Ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
    <p><strong>Total Bill: $ {props.price}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.cancel}>Cancel</Button>
            <Button btnType="Success" clicked={props.continue}> Continue</Button>
        </Auxilary>
    )
}

export default orderSummary;