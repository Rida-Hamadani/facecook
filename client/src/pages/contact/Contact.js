import React, { Component } from "react";
import saul from './saul.jpg';
import './Contact.css';

export class Contact extends Component {
  render() {
    return (
        <div className="contact">
          <img alt="Saul Goodman" src={saul} width="300px" length="200px"/>
          <p>Click <a href="mailto: mridahamadani@gmail.com" >here</a> to send us an email.</p>
        </div>
    )
  }
}

export default Contact;
