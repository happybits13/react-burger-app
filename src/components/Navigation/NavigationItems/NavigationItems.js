import React from 'react';
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active >Builder builder</NavigationItem>
        <NavigationItem link="/" active >Checkout</NavigationItem>
    </ul>
);

export default NavigationItems;