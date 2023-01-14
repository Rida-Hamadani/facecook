import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

class ProductCard extends Component {

  render() {
    const { id, name, description, cost } = this.props;
    return (
      <Fragment>
          <div className="card">
            <Link to={'/product/' + id}>
              <div className='items'>
                <img src={`/img/${name}.png`} alt={name} style={{width: "100%"}} />
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