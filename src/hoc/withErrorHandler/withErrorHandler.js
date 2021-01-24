import React, { Component } from 'react';
import Auxilary from '../Auxilary'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios)=>{
    return class extends Component{
        state={
            error: null
        }

        componentWillMount(){
            this.req  = axios.interceptors.request.use(req =>{
                this.setState({error:null})
                return req
            });

            this.rep=axios.interceptors.response.use(rep=>rep, error=>{
                this.setState({error:error})
            })

        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.req);
            axios.interceptors.response.eject(this.rep);
        }

        errorHandler = ()=>{
            this.setState({error:null})
        }

        render(){
            return(
                <Auxilary>
                    <Modal show={this.state.error} modalClosed={this.errorHandler}>
                        {this.state.error?this.state.error.message:null}
                    </Modal>
                    <WrappedComponent />
                </Auxilary>
            )
        }
    }
}

export default withErrorHandler;
