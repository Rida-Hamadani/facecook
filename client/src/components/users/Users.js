import React, { Component } from "react";
import { Navigate, useLocation } from "react-router-dom";

class Users extends Component {

  state = {

    users: undefined

  };

  componentDidMount() {

    this.isMounted = true;
    this.controller = new AbortController();
    this.getUsers();

  }

  componentWillUnmount() {
    
    this.isMounted = false;
    this.controller.abort();

  }

  getUsers = async () => {

    try {

      const response = await fetch("/users", {
        signal: this.controller.signal,
        credentials: "include",

      });

      if (response.ok) {

        const data = await response.json();
        console.log(data);
        this.isMounted && this.setState({ users: data });

      } else {

        this.navigateToLogin();

      }
    } catch (err) {

      console.error(err);
      this.navigateToLogin();

    }

  };

  navigateToLogin = () => {

    const { location } = this.props;

    Navigate("/login", {

      state: { from: location },
      replace: true,

    });

  };

  render() {

    const { users } = this.state;

    return (

      <article>

        <h2>Users List</h2>

        {users?.length ? (

          <ul>

            {users.map((user, i) => (

              <li key={i}>{user?.username}</li>

            ))}

          </ul>

        ) : (

          <p>No users to display</p>

        )}

      </article>

    );

  }
  
}

export default Users;
