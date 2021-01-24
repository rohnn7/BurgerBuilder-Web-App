import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route, Redirect} from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'

class Checkout extends Component{
    state={
        ingredients:null,
        price:0
    }


    
    // componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredientss = {}; 
    //     let prices = 0;
    //     for (let param of query.entries()) {
    //         // ['salad', '1']
    //        if(param[0]==='price'){
    //            prices=param[1];
    //        }else{
    //         ingredientss[param[0]] = +param[1];
    //        }
    //     }
    //     this.setState({ingredients: ingredientss, price:prices});
        
    // }


    checkoutcancelled =()=>{
        this.props.history.goBack();
    }

    checkoutcontinued =()=>{
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        let summary =<Redirect to='/' />
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased? <Redirect to='/'/>:null
            summary=(
                <div>
                 {purchasedRedirect}
                <CheckoutSummary ingredients={this.props.ings} 
                                cancelled={this.checkoutcancelled}
                                continued={this.checkoutcontinued}
                />
                <Route path={this.props.match.url +'/contact-data'} component={ContactData} />
            </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = state =>{
    return{
        ings: state.bgb.ingredients,
        price: state.bgb.totalPrice,
        purchased:state.ord.purchased
    }
}



export default connect(mapStateToProps)(Checkout);