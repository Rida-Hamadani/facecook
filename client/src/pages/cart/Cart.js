import React, { Component, Fragment } from "react";
import { Link, Navigate } from "react-router-dom"; 
import smile from './walter_smile.webp';
import './Cart.css';

export class Cart extends Component {

    constructor(props) {

        super(props);

        this.state = {

            response: null,
            cart: []

        };

    }

    handleRemove = index => {

        const uid = localStorage.getItem('user');

        if (! uid) {
            return;
        }

        let newCart = [...this.state.cart];

        fetch('http://localhost:8888/cart/' + uid.slice(1,-1), {

            method: 'PATCH',
            headers: {'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'},
            body: new URLSearchParams({
      
              "remove": newCart[index][0].id
      
            })

        })

        if (newCart[index][1] > 1) {

            newCart[index][1] -= 1;
            
        } else {

            newCart.splice(index, 1);

        }

        this.setState({ cart: newCart });

    }

    async handleCart (response) {

        if (response) {
            if (response.cart && response.cart === "empty") {

                this.setState({
                    cart: []
                })

            } else {

                let newCart = [];

                for (let id of Object.keys(response)) {

                  const res = await fetch(`http://localhost:8888/products/${id}`);
                  const item = await res.json();
                  newCart.push([item, response[id]]);

                }

                this.setState({ cart: newCart });

            }

        }

    }

    calculateCost = () => {

        let cost = 0;

        this.state.cart.forEach((item) => {

            cost += item[0].cost * item[1];

        })

        return cost;

    }

    displayMessage = () => {

        document.getElementById("final-message").style.display="block"; 
        setTimeout(function () {
            document.getElementById("final-message").style.display="none"; 
        }, 2000);

    }

    componentDidMount() {

        this.setState({ cart: [] });

        const uid = localStorage.getItem('user');

        if (! uid) {
            return;
        }

        fetch('http://localhost:8888/cart/' +  uid.slice(1,-1))
        .then(response => response.json())
        .then(data => 
        
            this.handleCart(data)

        )

    }

    
    render() {

        if (!localStorage.getItem('user')) {


            return <Navigate to="/" />;
    
        }

        return (

            <Fragment>
            {(this.state.cart.length === 0) ? (
                <div className="empty-cart">
                    <p>First visit the <Link to="/shop">shop</Link> to buy something.</p>
                </div>
            ) : (
                <div className="cart-container">
                    <div className="head">
                        <p>Click an item to remove</p>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.cart.map((item, index) => (
                                <tr key={item[0].id} onClick={() => this.handleRemove(index)}>
                                    <td>{item[0].name}</td>
                                    <td>{item[1]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="cost-container">
                        <p>Total cost: {this.calculateCost()}$</p>
                    </div>
                    <button onClick={this.displayMessage}>Pay</button>
                    <div id="final-message">
                    <p>Payment Successful!</p>
                    <img alt="Walter smiling" src={smile} width="200px" height="200px"/>
                    </div>
                </div>
            )}
            </Fragment>

        );

     }

}

export default Cart;
