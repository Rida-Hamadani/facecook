import React, { Component, Fragment } from "react";
import { Navigate } from "react-router-dom"; 

export class Cart extends Component {

    constructor(props) {

        super(props);

        this.state = {

            response: null

        };

    }

    componentDidMount() {

        const uid = localStorage.getItem('user');

        if (! uid) {
            return;
        }
    
        fetch('http://localhost:8888/cart/' +  uid.slice(1,-1))
        .then(response => response.json())
        .then(data => this.setState({

                response: data

        }))

    }
    
    render() {

        if (!localStorage.getItem('user')) {


            return <Navigate to="/" />;
    
        }

        return (

            <Fragment>
            <p>{JSON.stringify(this.state.response)}</p>
            </Fragment>

        );

     }

}

export default Cart;
