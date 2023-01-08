import React, { Component, Fragment } from "react";
import Navbar from "./components/navbar/Navbar";
import Home from './pages/home/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import LogIn from './pages/LogIn';
import SignUp from "./pages/SignUp";
import './App.css'
import { Routes, Route } from "react-router-dom";

export class App extends Component {
  render() {
    return(
        <Fragment>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/shop' element={<Shop />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/about' element={<About />} />
                <Route path='/login' element={<LogIn />} />
                <Route path='/signup' element={<SignUp />} />
            </Routes>
        </Fragment>
    );
  }
}

export default App;
