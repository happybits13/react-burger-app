import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button'; 

import classes from './CheckoutSummary.module.css';


const checkoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSumary}>
            <h1>Check out summary</h1>
            <div style={{width:'100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}></Burger>
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutContinue}>CONTINUE</Button>
        </div>
    )

}

export default checkoutSummary;