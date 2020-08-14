import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axiosInstance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';


class Orders extends Component {

    state = {
        orders: [],
        loading: false
    };

    componentDidMount(){
 
        this.setState({loading: true});

        axiosInstance.get('orders.json')
            .then( response =>{
                const fetchedOrders = [];
                for (let key in response.data){
                    fetchedOrders.push({
                        // this is all the orders
                        ...response.data[key],
                        id: key
                    });
                }
                this.setState({loading: false, orders: fetchedOrders})
 
            })
            .catch( error => { 
                this.setState({loading: false})
            });
    }

    render(){

        let orders = <Spinner></Spinner>

        orders = this.state.orders.map(order=>{
           return (<Order key={order.id} ingredients={order.ingredients} price={order.price}/>)
        });


        return(
            <div>
                {orders}
                {/* {this.state.orders.map(order => (
                   <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
                ))}; */}
            </div>

        );
    }
}


export default withErrorHandler(Orders, axiosInstance);