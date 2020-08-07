import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const Burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => { 
        return <BurgerIngredient key={igKey + i} type={igKey}></BurgerIngredient> })
   })     // [Array[1], Array[2], Array[1], Array[1]]
   .reduce((arr, el) => {
       return arr.concat(el)
   }, []);
        // [salad, bacon, bacon, cheese, meat]

    if (transformedIngredients.length === 0 ){
        transformedIngredients = <p>Please add ingredients</p>
    }
   
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
            
        </div>
    );
}

export default Burger;