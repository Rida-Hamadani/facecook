import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

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

            fetch('http://localhost:8888/login', {

                method: 'POST',
                headers: {'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'},
                body: new URLSearchParams({

                     "uid": this.state.uid,
                     "pwd": this.state.pwd,
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

  render() {
    return (
        <Fragment>
            <h2>Log In</h2>
            <form onSubmit={this.handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input type="text" name="uid" placeholder="Username" onChange={this.handleUidChange}/>
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" name="pwd" placeholder="Password" onChange={this.handlePwdChange}/>
            <br />
            <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
            <button type="submit">Log In</button>
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

export default LogIn;
