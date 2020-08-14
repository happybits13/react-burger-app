import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = ( WrappedComponent, axiosInstance ) => {
    return class extends Component {
        state = {
            error: null
        }


        errorConfirmedHandler = () => {
            this.setState({error: null});
        }


        // can use constructor also. otherwise use react hook. This is used so that interceptors is set up before render
        UNSAFE_componentWillMount(){
            this.reqInterceptor = axiosInstance.interceptors.request.use(req=>{
                this.setState({error: null});
                return req;
            });

            this.resInterceptor = axiosInstance.interceptors.response.use(res=>res, error=>{
                this.setState({error: error});
            });
        }

        // during removal of UI, will go thru this
        componentWillUnmount(){
            axiosInstance.interceptors.request.eject(this.reqInterceptor);
            axiosInstance.interceptors.response.eject(this.resInterceptor);
        }

        render(){
            return(
                
                <React.Fragment>
                    <Modal 
                        show={this.state.error} 
                        modalCancel={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}></WrappedComponent>
                </React.Fragment>
            )    
        }
    }

}

export default withErrorHandler;