import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawToggle'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle opened={props.opened}>MENU</DrawerToggle>
        <div className={classes.Logo}>
            <Logo></Logo>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems></NavigationItems>
        </nav>
    </header>
);

export default toolbar;