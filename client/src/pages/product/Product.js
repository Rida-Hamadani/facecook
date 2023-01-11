import React, { Component, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import NotFound from "../404/NotFound";
import './Product.css';

class Product extends Component {

  constructor(props) {

    super(props);

    this.state = {

      response: null

    };
  
  }

  handleCart = async event => {

    event.preventDefault()


    fetch('http://localhost:8888/cart/' + localStorage.getItem('user').slice(1,-1), {

      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'},
      body: new URLSearchParams({

        "new": this.props.params.id

      })

    })

    document.getElementById("check").style.display="block"; 
    setTimeout(function () {
        document.getElementById("check").style.display="none"; 
    }, 1000);

  }

  componentDidMount() {
    
    fetch('http://localhost:8888/products/' + this.props.params.id)
    .then(response => response.json())
    .then(data => {

      this.setState({
        
        response: data

      });

    });

  }


  render() {

    const { response } = this.state;

    if (response && response.message && response.message === 'Product not found' || this.props.params.id === '0') {

      return <NotFound />

    }

    return (
      <Fragment>
        <div className="product-container">
          <div className="left-column">
            <img src="https://www.utsouthwestern.edu/asset/4021d4c4-526c-4b40-815c-1fa0241282fb/meth-thumb.jpg" alt="meth" />
          </div>
          <div className="right-column">
            <div className="product-description">
              <span>
                Walter White &amp; Co.
              </span>
              <h1>{response && response.name}</h1>
              <p>{response && response.description}</p>
            </div>
            <div className="product-price">
              <span>${response && response.cost}</span>
              {localStorage.getItem('user') ? 
              <button onClick={this.handleCart}> Add to cart </button>
              : <Link to='/login'><button>Log in</button></Link>}
              <div id="check">
                <p>Added!</p>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );

  }
  
}

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

export default withParams(Product);