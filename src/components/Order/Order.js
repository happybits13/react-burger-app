import React from 'react';

import classes from './Order.module.css'

const order = (props) => {

    const ingredients = []

    for(let ingredientName in props.ingredients){
        ingredients.push({name: ingredientName, amount: props.ingredients[ingredientName]})
    }

    const ingredientsOutput = ingredients.map(ig => {
        return <span className={classes.IngredientOutput} key={ig.name}>{ig.name}:{ig.amount}</span>
    });

    return(
        <div className={classes.Order}>
            {<p> {ingredientsOutput} </p>}
            <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );

}

export default order;