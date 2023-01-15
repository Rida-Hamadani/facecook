import React, { Component, Fragment } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Label from '../../components/label/Label';
import './Auth.css';

class LogIn extends Component {

    constructor(props) {

        super(props);

        this.state = {

            uid: '',
            pwd: '',
            response: null

        };
        
    }
    
    handleSubmit = event => {
        event.preventDefault();

        fetch('https://facecookwalter.000webhostapp.com/login', {

            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'},
            body: new URLSearchParams({

                    "uid": this.state.uid,
                    "pwd": this.state.pwd,
                    "submit": "true"

            })
        })
        .then(response => response.json())
        .then(data => {

            this.handleSuccess(this.state.uid, data);

            this.setState({

            response: data

            });

        })

    }
    
    handleUidChange = event => {

        this.setState({
          uid: event.target.value
        });

    }
    
    handlePwdChange = event => {

        this.setState({
            pwd: event.target.value
        });

    }

    handleSuccess = (uid, response) => {

        if (response && response.messages && response.messages[0] === 'Success') {

            localStorage.setItem("user", JSON.stringify(uid));

            window.dispatchEvent(new Event("logIn"));
    
        }

        return true;

    }


  render() {

    const { response } = this.state;

    if (localStorage.getItem('user')) {


        return <Navigate to="/" />;

    }

    return (
        <Fragment>
            <form onSubmit={this.handleSubmit}>
                <div className="auth-container auth-center">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="uid" placeholder="Username" onChange={this.handleUidChange}/>
                    <br />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="pwd" placeholder="Password" onChange={this.handlePwdChange}/>
                    <br />
                    <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
                    <button type="submit">Log In</button>
                    {response && response.errors && <Label message={response.errors[0]}/>}
                </div>
            </form>

        </Fragment>
        );
    }
}

export default LogIn;
