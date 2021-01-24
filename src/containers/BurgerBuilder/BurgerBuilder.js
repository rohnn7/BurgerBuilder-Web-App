import React, {Component} from 'react'
import Auxilary from '../../hoc/Auxilary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/Buildcontrols/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect} from 'react-redux'
import * as burgerBuilderActions from '../../store/actions/index'

/*
    Burger Builder component basically has two parts 
    1) The UI of burger that is covered in <Burger/>
    2) The Toolbar that helps building that, this is covered in second div
    this is being rendered in App.js
*/

const INGREDIENTS_PRICE = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}

class BurgerBuilder extends Component{
    /*
        The state is added to make the addition of burger dynamic,
        the ingredients will pass as a props to <Burger/>
    */
    

    state = {
        ingredients:null,
        totalPrice:4,
        purchasable:false,
        purchasing:false,
        loading:false

    }
    componentDidMount(){
        console.log(this.props);
        // axios.get('https://burgerbuilder-baf3b.firebaseio.com/ingredients.json')
        //      .then(response =>{
        //         console.log(response)
        //         this.setState({ingredients: response.data})
        //      })
        //      .catch(error=>{});
        this.props.onInitIngredients()
    }

    purchaseHandler = ()=>{
        if(this.props.isAuthenticated){
            this.setState({
                purchasing:true
            });
    
        }else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/Auth')
        }        
    }

    purchaseCancelHandler = ()=>{
        
            
        this.setState({
            purchasing:false
        });
        
        

    }


    /*
        This method will basically post the updated data of state  to the backend

    */

    purchaseContinueHandler = ()=>{
     
    //    const querParams = [];
    //    for(let i in this.state.ingredients){
    //        querParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
    //    }
    //    querParams.push('price='+this.state.totalPrice);
    //    const queryString=querParams.join('&');
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }



    updatePurchaseState(ingredients ){
        
        const sum = Object.keys(ingredients).map(igKey =>{
            return ingredients[igKey]
        }).reduce((sum, el)=>{
            return sum+el;
        }, 0);
        return sum>0
    }

    addIngredienthandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = INGREDIENTS_PRICE[type] + this.state.totalPrice
        this.setState({
            totalPrice:newPrice,
            ingredients:updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
        
    }

    removeIngredienthandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice =this.state.totalPrice-INGREDIENTS_PRICE[type]
        this.setState({
            totalPrice:newPrice,
            ingredients:updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
    }
    /*
        As you know it as two components Burger for UI and BuilControls for toolbar.
        1. here <Burger/> is being render--> Inside Burger we first covert the ingredients we pass to array --> it
           further render BurgerIngriendients ---> Inside which JSx of 'type' ,passed as a props, is rendered
           SO BASICALLY WE CONNECT THE STATE TO INGREDIENTS (STATE-->INGREDIENTS)
        
        2. here we make event listener that increment and decremntes state properties---><BurgeControls/> is 
           rendered---> We pass EventListners and disabled <buildcontrols/>--->there it has a array of object
           which has same names of keys as in state--->then that array is traversed and each time <BuildControl/>
           is called with passed property--->that rendered JSx for Toolbar
           BASICALLY TOOLBAR DIRECTLY CONNECT STATE (TOOLBAR-->STATE)    
           
        TOOLBAR-->STATE-->INGREDIENTS   

        ######################################################################################################
        Now here we want that after sending the post request we want to display some data to user, but while 
        communicating to the server we want to display a loader/spinner to the ui

    */

    render(){
        /*
            this disableInfo is object that contains state.ingredients
            now we for loop the object and set the key to true or false
            and then passes it as props
        */
        const disabledInfo = {
            ...this.props.ings
        };
        for(var key in disabledInfo){
            disabledInfo[key]= disabledInfo[key]<=0;
        }
        let orderSummary =null
        

       
        let burger = <Spinner/>
        if(this.props.ings){
            burger =(
                <Auxilary>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdd}
                        ingredientremoved={this.props.onIngredientRemove}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}/>
                </Auxilary>
            );
            orderSummary =( <OrderSummary ingredients={this.props.ings} 
                cancel={this.purchaseCancelHandler}
                continue={this.purchaseContinueHandler} 
                price={this.props.price} />);
        }
        // if(this.props.loading){
        //     orderSummary=(<Spinner/>)
        // }
         

        return(
            <Auxilary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                {burger}
            </Auxilary>
        );
    }
}

const mapStateToProps =state=>{
    return{
        ings: state.bgb.ingredients,
        price: state.bgb.totalPrice,
        loading:state.bgb.loading,
        error:state.bgb.error,
        isAuthenticated: state.auth.token !== null

    }
}

const mapDispatchToProps =dispatch=>{
    return{
        onIngredientAdd:(ing)=>dispatch(burgerBuilderActions.addIngredient(ing)),
        onIngredientRemove:(ing)=>dispatch(burgerBuilderActions.removeIngredient(ing)),
        onInitIngredients:()=>dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase:()=>dispatch(burgerBuilderActions.purchaseint()),
        onSetAuthRedirectPath:(path)=>dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)( BurgerBuilder);