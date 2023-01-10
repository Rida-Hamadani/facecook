import React, { Component } from "react";
import './NotFound.css';

export class NotFound extends Component {

  render() {
    return (
      <div>
        <div className="not-found">
          <span className='four'>4</span>
          <i className="fa fa-cog fa-spin fa-5x fa-fw"></i>
          <span className='four'>4</span>
          <br/>
          <span className="message">Page not found!</span>
        </div>
      </div>
    );
  }
}

export default NotFound;
