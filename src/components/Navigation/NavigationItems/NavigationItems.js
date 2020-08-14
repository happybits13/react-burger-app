import React from 'react';
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Builder builder</NavigationItem>
        <NavigationItem link="/orders">Order</NavigationItem>
    </ul>
);

export default NavigationItems;