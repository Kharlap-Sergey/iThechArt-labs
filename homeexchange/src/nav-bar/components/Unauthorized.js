import React, { PureComponent } from 'react';
import PaintedLink from '../../shared/components/paintedLink/PaintedLink';
import { path } from '../../shared/utils/path';

class Unauthorized extends PureComponent {
  render() {
    return (
      <li className="menu__item menu__item--unauthorized" key="login">
        <PaintedLink to={path.login} value="login" />
        <PaintedLink to={path.registration} value="sign up" />
      </li>
    );
  }
}

export default Unauthorized;
