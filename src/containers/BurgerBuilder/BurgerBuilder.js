import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import Spinner from '../../components/UI/Spinner/Spinner';

import axiosInstance from '../../axios-orders';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrices: 0,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    }

    updatePurchaseState (ingredients) {
        // const ingredients = {
        //     ...this.state.ingredients
        // };
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            },0);

        this.setState({purchasable: sum > 0})
    }

    addIngredientsHandler = (type) => {
            // Handling count
            const oldCount = this.state.ingredients[type];
            const updatedCount = oldCount + 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;

            // Handling price
            const oldPrice = this.state.totalPrices;
            const priceAddition = INGREDIENTS_PRICES[type];
            const updatedPrice = oldPrice + priceAddition;

            // Set state. This only happens at render stage of lifecycle
            this.setState({totalPrices: updatedPrice, ingredients: updatedIngredients});
            this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientsHandler = (type) => {
        // Handling count
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        // Handling price
        const oldPrice = this.state.totalPrices;
        const priceAddition = INGREDIENTS_PRICES[type];
        const updatedPrice = oldPrice - priceAddition;

        // Set state. This only happens at render stage of lifecycle
        this.setState({totalPrices: updatedPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        const queryParams = [];

        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParams.push('price=' + this.state.totalPrices);

        const queryString = queryParams.join('&');

        this.props.history.push({
           pathname: '/checkout', // this is used for routing
           search: '?' + queryString // this is used to pass parameters to next page
        });

        
    }

    componentDidMount(){
        axiosInstance.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error=>{
                this.setState({error: true});
            });
    }

    render(){

        // To check if ingredient added <=0. if <=0, should disable LESS button
        const disabledIngredients = {
            ...this.state.ingredients
        };

        for(let key in disabledIngredients){
            disabledIngredients[key] = (disabledIngredients[key] <= 0);
        }

        let orderSummary = null
    

// purchasing=false loading=false
// [order now]: purchasing = true -> trigger order summary
// [continue]: (before click, purchasing=true) loading=true -> Loading screen
// [finish loading]: loading=false, purchasing=false -> removes the order summary

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner>Loading...</Spinner>

        if (this.state.ingredients){
            burger=(
                <React.Fragment>
                    <Burger ingredients={this.state.ingredients}></Burger>
                    <BuildControls
                        add={this.addIngredientsHandler} 
                        remove={this.removeIngredientsHandler}
                        disable={disabledIngredients}
                        price={this.state.totalPrices}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}>
                    </BuildControls>
                </React.Fragment>
            );

            orderSummary = 
                <OrderSummary 
                    ingredients={this.state.ingredients}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    price={this.state.totalPrices}>
                </OrderSummary>

        }

        if (this.state.loading){
            orderSummary = <Spinner></Spinner>
        }

        return(
            <React.Fragment>
                <Modal show={this.state.purchasing} modalCancel={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }

}

export default withErrorHandler(BurgerBuilder, axiosInstance);