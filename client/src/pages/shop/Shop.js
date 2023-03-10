import React, { Component, Fragment } from 'react';
import ProductCard from '../../components/product/ProductCard';
import './Shop.css';

class Shop extends Component {

  constructor(props) {

    super(props);

    this.state = {

      response: null

    };

  }

  componentDidMount() {

    fetch('https://facecookwalter.000webhostapp.com/products')
      .then(response => response.json())
      .then(data => {

        this.setState({
          
          response: data

        });

      });

  }

  render() {

    const { response } = this.state;

    return (
     <Fragment>
      <div className="products">
        {response ?
      response.map((props, index) => {
          return <ProductCard key={index} {...props}/>
      })
        : <p>Loading...</p>}
      </div>
     </Fragment>
    );
  }
}

export default Shop;