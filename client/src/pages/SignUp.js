import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class SignUp extends Component {

  render() {
    return (
        <Fragment>
            <h2>Sign Up</h2>
            <form>
            <label htmlFor="username">Username:</label>
            <input type="text" name="uid" placeholder="username" />
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" name="pwd" placeholder="password" />
            <br />
            <label htmlFor="password">Repeat password:</label>
            <input type="password" name="pwdRepeat" placeholder="password" />
            <br />
            <label htmlFor="email">E-mail:</label>
            <input type="text" name="email" placeholder="E-mail" />
            <br />
            <p>Already have an account? <Link to='/logIn'>Log in</Link></p>
            <button type="submit">Sign Up</button>
            </form>
        </Fragment>
        );
    }
}

export default SignUp;
