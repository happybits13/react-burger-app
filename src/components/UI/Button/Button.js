import classes from './Button.module.css';
import React from 'react';

const button = (props) => (
    <button
        disabled = {props.disabled}
        onClick={props.clicked}
        className={[classes.Button, classes[props.btnType]].join(' ')}>
            {props.children}
    </button>
);

export default button;