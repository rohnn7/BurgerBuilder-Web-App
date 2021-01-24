import React from 'react'
import classes from './Order.module.css'

const order = props =>{
    const ingredients=[];
    for(let ind in props.ingredients){
        ingredients.push(
            {
                name:ind,
                amount:props.ingredients[ind]
            }
        )
    }

    const ingredientOutput = ingredients.map(ig=>{
        return(
        <span
        style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
            }}
        key={ig.name}>{ig.name}: {ig.amount}</span>
        )
    })

    return(
        <div className={classes.Order}>
        <p>Ingredients: {ingredientOutput} </p>
        <p>price: $ {props.price}</p>
    </div>
    )
}

export default order;