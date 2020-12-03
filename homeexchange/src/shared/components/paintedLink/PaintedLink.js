import React from 'react';
import { Link } from 'react-router-dom';
import "./painted-link.scss"
class PaintedLink extends React.PureComponent {
  render() {
    console.log(this.props);
    return (
      <Link to={this.props.to} className="painted-link" data-item-content={this.props.value} >
        {this.props.value}
      </Link>
    );
  }
}

export default PaintedLink;
