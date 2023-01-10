import React, { Component } from "react";
import './Navbar.css';
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export class Navbar extends Component {

  constructor (props) {

    super(props);
    this.state = {

      user: localStorage.getItem('user'),
      isMenuOpen: false,
      innerWidth: window.innerWidth

    };

  }

  toggleMenu = () => {

    this.setState({

      isMenuOpen: !this.state.isMenuOpen

    });

  };

  handleResize = () => {

    this.setState({

      innerWidth: window.innerWidth

    });

    window.innerWidth > 600 && (

      this.setState({

        isMenuOpen: false

      })

    );

  };

  handleLogIn = () => {

    this.setState({

      user: localStorage.getItem('user')

    })

  }

  handleLogOut = () => {

    localStorage.removeItem('user');

    this.setState({
      
      user: null

    })

  }


  componentDidMount() {

    window.addEventListener('resize', this.handleResize);

    window.addEventListener('logIn', this.handleLogIn);

  };

  componentWillUnmount() {

    window.removeEventListener('resize', this.handleResize);

  };

  render() {

    const { user, isMenuOpen, innerWidth } = this.state;

    return (

        <nav className="nav">
          {(!isMenuOpen || innerWidth > 600) && <Link to="/" className="logo">FaceCook</Link>}
          {(user && !isMenuOpen)? <i className="fa fa-shopping-cart" /> : ''}
          {(isMenuOpen || innerWidth > 600) && (
            <ul>
              <CustomLink to='/shop'>Shop</CustomLink>
              <CustomLink to='/about'>About</CustomLink>
              <CustomLink to='contact'>Contact</CustomLink>
              {user ? 
              <li><Link to='/' onClick={this.handleLogOut}><i className="fa fa-sign-out"/> Log Out</Link></li>
              : <CustomLink to='/login'><i className="fa fa-sign-in"/> Log In</CustomLink>}
            </ul>
          )}
          {innerWidth <= 600 && (<div className="burger-container" onClick={this.toggleMenu}>
            {!isMenuOpen && (<i className="fa fa-bars"/>
            )}
            {isMenuOpen && <i className="fa fa-times" />}
          </div>
          )}
        </nav>

    )

  }

}

const CustomLink = ({ to, children, ...props }) => {

  const path = useResolvedPath(to);

  return (

    //Gives active class in case current URL matches the one passed in the parameters

    <li className={useMatch({ path: path.pathname, end: true }) ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>

  )

}

export default Navbar;
