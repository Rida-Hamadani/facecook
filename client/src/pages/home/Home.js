import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import hazmat from './hazmat.jpg';
import gus from './gus.jpg';
import './Home.css';

class Home extends Component {

  render() {
    const user = localStorage.getItem("user").slice(1, -1);
    return (
     <Fragment>
      <div className='home'>
      <div className='welcome'>
        Welcome{user ? ', ' + user + ', ': ' ' }to FaceCook, the #1 e-commerce company in the world!
      </div>
      <div className='grid-container'>
      <div className='grid-item'>
      <Link to='/shop'><p>Browse our top products, produced by the best cook, Walter White himself.</p></Link>
      </div>
      <div className='grid-item'>
      <img src={hazmat} alt="Our labs" />
      </div>
      <div className='grid-item'>
      <img src={gus} alt="Our CEO" />
      </div>
      <div className='grid-item'>
      <Link to='/about'><p>Learn more about the history of our shop and the culture of our company.</p></Link>
      </div>
      </div>
      <div className='welcome'>
        <Link to='/contact'>Stay in touch.</Link>
      </div>
      </div>
     </Fragment>
    );
  }
}

export default Home;
