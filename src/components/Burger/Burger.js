import React from 'react';
import classes from './Burger.module.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'


/*
    This where we call the <BurgerIngredients/> i.e. UI so all of css will be rendered here
    Now, even further this <Burger/> is being rendered to BurgerBuilder.js. To complete furhter tree
    refer BurgerBuilder Comment
*/

const burger = props =>{
    
    /*
        This approach is used because what we recieved was a object but we want array so:
        1. We used Object.Keys() which takes an object and covert it into array of keys
        2. then on those array of keys we used map function to traverse through each key
        3. that function returns a array of the no. of spaces with value
        4. Then we use again a map function and returns JSx equals no. of space(i.e value of key)
        5. Now after that we use reduce so that we can concat the array element into a singal array
        Note: if u dont get 5. point console.log(transformedIngredients) without reduce and with reduce
    */
   let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map(( _, i) => (
            <BurgerIngredients key={igKey+i} type={igKey}/>
        ));
    }).reduce((arr,el)=>{
        return arr.concat(el);
    }, []);

    // console.log(transformedIngredients);

    if(transformedIngredients.length === 0){
        transformedIngredients=(<p>Please start adding element</p>)
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom"/>
        </div>
    );
}

export default burger;