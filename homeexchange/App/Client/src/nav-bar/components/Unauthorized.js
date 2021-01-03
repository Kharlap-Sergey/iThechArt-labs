import React, { PureComponent } from "react";
import PaintedLink from "../../shared/components/paintedLink/PaintedLink";
import { path } from "../../shared/utils/path";

class Unauthorized extends PureComponent {
  render() {
    return (
      <li className="menu__item menu__item--unauthorized" key="login">
        <PaintedLink to={path.sign} value="sign" />
      </li>
    );
  }
}

export default Unauthorized;
