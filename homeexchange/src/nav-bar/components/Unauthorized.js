import React, { PureComponent } from 'react';
import PaintedLink from '../../shared/components/paintedLink/PaintedLink';

class Unauthorized extends PureComponent {
  render() {
    return (
      <li className="menu__item menu__item--unauthorized" key="login">
        <PaintedLink to="/login" value="login" />
        <PaintedLink to="/registration" value="sign up" />
      </li>
    );
  }
}

export default Unauthorized;
