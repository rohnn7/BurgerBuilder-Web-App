import React, { Component } from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import * as actions from '../../store/actions/index'
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component{
    state={
        orders:[],
        loading:true
    }

    componentDidMount(){
        this.props.onFetchOrders(this.props.token);
        console.log(this.props.orders);
    }

    render(){
        let loading = <Spinner/>
        if(!this.props.loading){
            loading = (
                <div>
                   {this.props.orders.map(order => (
                       <Order key={order.id}
                                ingredients={order.ingredients}
                                price={order.price} />
                                ))}
                </div>
            )
        }

        return loading;
    }
}
const mapStateToProps=state=>{
    return{
        orders:state.ord.orders,
        loading:state.ord.loading,
        token: state.auth.token

    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onFetchOrders:(token)=>dispatch(actions.fetchOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);