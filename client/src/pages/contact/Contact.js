import React, { Component } from "react";
import './Contact.css';

export class Contact extends Component {
  render() {
    return (
        <div className="contact">
          Click <a href="mailto: mridahamadani@gmail.com" >here</a> to send us an email.
        </div>
    )
  }
}

export default Contact;
