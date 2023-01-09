import React from 'react';
import './Label.css';

class Label extends React.Component {
  render() {
    return (
      <div className="label">
        {this.props.message}
      </div>
    );
  }
}

export default Label;