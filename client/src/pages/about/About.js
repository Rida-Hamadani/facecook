import React, { Component, Fragment } from "react";
import './About.css';


export class About extends Component {
  render() {
    return (
      <Fragment>
        <div className="about">
          <div className="about-container">
            <div className="about-left-column">
                <img alt="Walter White" src="/img/Walter.png" />
              </div>
              <div className="about-right-column">
                <p>
                  My name is Walter Hartwell White. <br />
                  I live at 308 Negra Arroyo Lane, Albuquerque, New Mexico, 87104.  <br />
                  To all law enforcement entities, this is not an admission of guilt.  <br />
                  I am speaking to my customers now.
                </p>
                <p className="knocks">
                  I am the one who knocks.
                </p>
              </div>
            </div>
          </div>
      </Fragment>
    )
  }
}

export default About;
