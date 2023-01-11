import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

class ProductCard extends Component {

    constructor(props) {

        super(props);
    
    }


  render() {
    const { id, name, description, cost } = this.props;
    return (
      <Fragment>
          <div className="card">
            <Link to={'/product/' + id}>
              <div className='items'>
                <img src="https://www.w3schools.com/w3images/jeans3.jpg" alt="Denim Jeans" style={{width: "100%"}} />
                <h2>{name}</h2>
                <p className="price">${cost}</p>
                <p>{description}</p>
              </div> 
          </Link>
        </div>
      </Fragment>
    );
  }
}

export default ProductCard;