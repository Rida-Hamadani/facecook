import React, { Component } from "react";
import './Navbar.css';
import logo from './logo.png';
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
          {(!isMenuOpen || innerWidth > 600) && <Link to="/"><div className="logo"><img alt="FaceCook" src={logo}/></div></Link>}
          {(user && !isMenuOpen)?
          <Link to='/cart'><div className="cart"><i className="fa fa-shopping-cart fa-2x" /></div></Link>: ''}
          {(isMenuOpen || innerWidth > 600) && (
            <ul>
              <CustomLink onClick={isMenuOpen ? this.toggleMenu : ''} to='/shop'>Shop</CustomLink>
              <CustomLink onClick={isMenuOpen ? this.toggleMenu : ''} to='/about'>About</CustomLink>
              <CustomLink onClick={isMenuOpen ? this.toggleMenu : ''} to='contact'>Contact</CustomLink>
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

const CustomLink = ({ to, children, onClick, ...props }) => {

  const path = useResolvedPath(to);

  return (

    //Gives active class in case current URL matches the one passed in the parameters

    <li className={useMatch({ path: path.pathname, end: true }) ? 'active' : ''}>
      <Link to={to} onClick={onClick} {...props}>
        {children}
      </Link>
    </li>

  )

}

export default Navbar;
