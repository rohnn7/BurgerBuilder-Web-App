import * as actionTypes from './actionsType';
import axios from '../../axios-orders'

export const addIngredient = name =>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:name
    }
}

export const removeIngredient = name =>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    }
}

export const setIngredients = ingredients=>{
    return{
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}
export const fetchIngredientsFailed =()=>{
    return{
        type:actionTypes.FETCH_INGREDIENTS_FAILED,
        
    }
}


export const initIngredients = ()=>{
    return dispatch =>{
        axios.get('https://burgerbuilder-baf3b.firebaseio.com/ingredients.json')
             .then(response =>{
                console.log(response)
                dispatch(setIngredients(response.data))
             })
             .catch(error=>{
                dispatch(fetchIngredientsFailed())
             });
    }
}