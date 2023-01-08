import React, { Component } from "react";
import './Navbar.css';
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export class Navbar extends Component {

  constructor (props) {
    super(props);
    this.state = {
      isMenuOpen: false,
      innerWidth: window.innerWidth
    };
  }

  toggleMenu = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
    });
  };

  handleResize = () => {
    this.setState({
      innerWidth: window.innerWidth
    });
    window.innerWidth > 500 && (
      this.setState({
        isMenuOpen: false
      })
    );
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  };

  render() {
    return (
        <nav className="nav">
          {(!this.state.isMenuOpen || this.state.innerWidth > 500) && <Link to="/" className="logo">FaceCook</Link>}
          {(this.state.isMenuOpen || this.state.innerWidth > 500) && (
            <ul>
              <CustomLink to='/shop'>Shop</CustomLink>
              <CustomLink to='/about'>About</CustomLink>
              <CustomLink to='contact'>Contact</CustomLink>
              <CustomLink to='/login'><i className="fa fa-sign-in"/> Log In</CustomLink>
            </ul>
          )}
          {this.state.innerWidth <= 500 && (<div className="burger-container" onClick={this.toggleMenu}>
            {!this.state.isMenuOpen && (<i className="fa fa-bars"/>
            )}
            {this.state.isMenuOpen && <i className="fa fa-times" />}
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
