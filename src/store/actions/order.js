import * as actionType from './actionsType';
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData)=>{
    return{
        type:actionType.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData:orderData
    }
}

export const purchaseBurgerFail = (error)=>{
    return{
        type:actionType.PURCHASE_BURGER_FAILED,
        error:error
    }
}

export const purchaseBurger = ()=>{
    return{
        type: actionType.PURCHASE_BURGER_START
    }
}

export const purchaseint = ()=>{
    return {
        type: actionType.PURCHASE_INIT
    }
}

export const purchaseBurgerStart = (orderData,token)=>{
    return dispatch =>{
        dispatch(purchaseBurger())
        axios.post('/orders.json?auth='+token, orderData)
             .then(response =>{
                 console.log(response.data)
                 dispatch(purchaseBurgerSuccess(response.data, orderData))
                
             })
             .catch(error =>{
                 console.log(error)
                 dispatch(purchaseBurgerFail(error))
             });
    }
}

export const fetchOrderSuccess = orders =>{
    return{
        type:actionType.FETCH_ORDER_SUCCESS,
        orders:orders
    }
}

export const fetchOrdersFail = error =>{
    return{
        type:actionType.FETCH_ORDER_FAIL,
        error:error
    }
}

export const fetchOrdersStart =()=>{
    return {
        type:actionType.FETCH_ORDER_START
    }
}

export const fetchOrders = (token)=>{
    return dispatch=>{
        dispatch(fetchOrdersStart())
        axios.get('/orders.json?auth='+token)
            .then(res=>{
                
                const fetchedOrders = [];
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                    id:key});
                }
                
                dispatch(fetchOrderSuccess(fetchedOrders))
                
            })
            .catch(err=>{
                dispatch(fetchOrdersFail())
            })
    }
}