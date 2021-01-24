import React , {Component} from 'react';
import classes from './BurgerIngredients.module.css'
import PropType from 'prop-types'
import BurgerBuilder from '../../../containers/BurgerBuilder/BurgerBuilder';

/*
    This component would be responsible for the UI of Different INGREDIENTS
    So, it takes type as a props and then we check the type meets with which
    and accordingly asign JSx to the variable and then after JSx we just return
    the variable which holds the JSx.
*/


class BurgerIngredients extends Component{
    render(){

     let ingredients = null;

        switch(this.props.type){
            case('bread-bottom'):
              ingredients = <div className={classes.BreadBottom}></div>
             break;
            case('bread-top'):
              ingredients = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
              );
                break;
            case('meat'):
                ingredients = <div className={classes.Meat}></div>
                 break;            
            case('cheese'):
                ingredients = <div className={classes.Cheese}></div>
                break;            
            case('salad'):
                ingredients = <div className={classes.Salad}></div>
                break;            
            case('bacon'):
                ingredients = <div className={classes.Bacon}></div>
                break; 
            default:
                ingredients = null;                                                                             
         }

     return ingredients;
    }
} 


export default BurgerIngredients;