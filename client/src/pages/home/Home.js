import React, { Component, Fragment } from 'react';
import './Home.css';

class Home extends Component {

  constructor(props) {

    super(props);

    this.state = {

      response: null

    };

  }

  componentDidMount() {

    fetch('http://localhost:8888/products/featured')
      .then(response => response.json())
      .then(data => {

        this.setState({
          
          response: data

        });

      });

  }

  render() {
    return (
     <Fragment>

        {this.state.response ? (
          <p>{JSON.stringify(this.state.response)}</p>
        ) : (
          <p>Loading...</p>
        )}

     </Fragment>
    );
  }
}

export default Home;
