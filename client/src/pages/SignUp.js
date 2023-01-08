import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

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

            fetch('http://localhost:8888/signup', {

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
    return (
        <Fragment>
            <h2>Sign Up</h2>
            <form onSubmit={this.handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input type="text" name="uid" placeholder="Username" onChange={this.handleUidChange} />
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" name="pwd" placeholder="Password" onChange={this.handlePwdChange} />
            <br />
            <label htmlFor="password">Repeat password:</label>
            <input type="password" name="pwdRepeat" placeholder="Password" onChange={this.handlePwdRepeatChange} />
            <br />
            <label htmlFor="email">E-mail:</label>
            <input type="text" name="email" placeholder="E-mail" onChange={this.handleEmailChange} />
            <br />
            <p>Already have an account? <Link to='/logIn'>Log in</Link></p>
            <button type="submit">Sign Up</button>
            </form>

            {this.state.response ? (
          <p>{JSON.stringify(this.state.response)}</p>
        ) : (
          <p>Loading...</p>
        )}

        </Fragment>
        );
    }
}

export default SignUp;
