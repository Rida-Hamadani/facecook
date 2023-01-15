import React, { Component, Fragment } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Label from '../../components/label/Label';
import './Auth.css';

class SignUp extends Component {


    constructor(props) {

        super(props);

        this.state = {

            uid: '',
            email: '',
            pwd: '',
            pwdRepeat: '',
            response: null

        };
    }

    handleSubmit = event => {
        event.preventDefault();

            fetch('https://facecookwalter.000webhostapp.com/signup', {

                method: 'POST',
                headers: {'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'},
                body: new URLSearchParams({

                     "uid": this.state.uid,
                     "pwd": this.state.pwd,
                     "pwdRepeat": this.state.pwdRepeat,
                     "email": this.state.email,
                     "submit": "true"

                })
            })
            .then(response => response.json())
            .then(data => this.setState({

                response: data

            }))
        
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

    handlePwdRepeatChange = event => {

        this.setState({
            pwdRepeat: event.target.value
        });

    }


    handleEmailChange = event => {

        this.setState({
          email: event.target.value
        });

    }

  render() {

    const { response } = this.state;

    if (response && response.messages && response.messages[0] === 'Success') {

        return <Navigate to="/login" />;

    }

    if (localStorage.getItem('user')) {


        return <Navigate to="/" />;

    }


    return (
        <Fragment>
            <form onSubmit={this.handleSubmit}>
                <div className="auth-container auth-center">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="uid" placeholder="Username" onChange={this.handleUidChange} />
                    <br />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="pwd" placeholder="Password" onChange={this.handlePwdChange} />
                    <br />
                    <label htmlFor="password">Repeat password</label>
                    <input type="password" name="pwdRepeat" placeholder="Password" onChange={this.handlePwdRepeatChange} />
                    <br />
                    <label htmlFor="email">E-mail</label>
                    <br />
                    <input type="text" name="email" placeholder="E-mail" onChange={this.handleEmailChange} />
                    <br />
                    <p>Already have an account? <Link to='/logIn'>Log in</Link></p>
                    <button type="submit">Sign Up</button>
                    {response && response.errors && <Label message={response.errors[0]}/>}
                </div>
            </form>

        </Fragment>
        );
    }
}

export default SignUp;
