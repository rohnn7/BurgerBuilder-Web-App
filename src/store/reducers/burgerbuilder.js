import * as actionType from '../actions/actionsType';

const initialState = {
    ingredients:null,
    totalPrice:4,
    error:false,
    loading:true,
    building: false,  
};

const INGREDIENTS_PRICE = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case(actionType.ADD_INGREDIENT):
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                },
                totalPrice:state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
                building:true
            };
        case(actionType.REMOVE_INGREDIENT):
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice:state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
                building:true
            };
        case(actionType.SET_INGREDIENTS):
            return{
                ...state,
                ingredients:action.ingredients,
                loading:false,
                totalPrice:4,
                building:false
            };
        case(actionType.FETCH_INGREDIENTS_FAILED):
            return{
                ...state,
                error:false
            }    
        default:
            return state   
    }

}

export default  reducer