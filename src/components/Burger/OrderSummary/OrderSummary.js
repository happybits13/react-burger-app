import React, {Component} from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    // This can be a functional component, if you are not using lifecycle hook (componentDidUpate)
    componentDidUpdate(){
        console.log('[OrderSummary] componentDidUpdate');
    };

    render(){

        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey=>{
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>)
            });

        return(
            <React.Fragment>
                <h3>Your Order</h3>
                <p>A burger with following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </React.Fragment>
        );

    }

}

export default OrderSummary;