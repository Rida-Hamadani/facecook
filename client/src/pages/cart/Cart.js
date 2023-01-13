import React, { Component, Fragment } from "react";
import { Link, Navigate } from "react-router-dom"; 
import './Cart.css';

export class Cart extends Component {

    constructor(props) {

        super(props);

        this.state = {

            response: null,
            cart: []

        };

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

    handleRemove = index => {

        const uid = localStorage.getItem('user');

        if (! uid) {
            return;
        }

        let newCart = [...this.state.cart];

        fetch('http://localhost:8888/cart/' + uid.slice(1,-1), {

            method: 'POST',
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
                </div>
            )}
            </Fragment>

        );

     }

}

export default Cart;
