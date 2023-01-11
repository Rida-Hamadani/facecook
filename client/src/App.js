import React, { Component, Fragment } from "react";
import Navbar from "./components/navbar/Navbar";
import Home from './pages/home/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Shop from './pages/shop/Shop';
import LogIn from './pages/auth/LogIn';
import SignUp from "./pages/auth/SignUp";
import Cart from "./pages/cart/Cart";
import NotFound from "./pages/404/NotFound";
import Product from "./pages/product/Product";
import './App.css'
import { Routes, Route } from "react-router-dom";

export class App extends Component {
  render() {
    return(
        <Fragment>
            <Navbar />
            <Routes>
                <Route path='*' element={<NotFound />} />
                <Route path='/' element={<Home />} />
                <Route path='/shop' element={<Shop />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/about' element={<About />} />
                <Route path='/login' element={<LogIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/cart' element={<Cart />} />
                <Route path="/product/:id" element={<Product/> } />
            </Routes>
        </Fragment>
    );
  }
}

export default App;
