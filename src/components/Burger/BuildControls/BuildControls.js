import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.module.css'

const controls = [
    {label: 'Salad', type:'salad'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Meat', type:'meat'}
];

const buildControls = (props) => {
    return(
        <div className={classes.BuildControls}>
            <p>Current price: <strong>{props.price.toFixed()}</strong></p>
            {controls.map(ctrl => (
                <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label}
                    add={() => props.add(ctrl.type)}
                    remove={() => props.remove(ctrl.type)}
                    disable={props.disable[ctrl.type]}>
                </BuildControl>
            ))}
            <button onClick={props.ordered} disabled={!props.purchasable} className={classes.OrderButton}>Order now</button>

        </div>
    );
}

export default buildControls;