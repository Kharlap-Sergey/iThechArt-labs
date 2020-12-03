import React, { PureComponent } from "react";
import PaintedLink from "../../shared/components/paintedLink/PaintedLink";

class FooterForForm extends PureComponent {
  render() {
    return (
      <div className="form__text">
        <p>or</p>
        <PaintedLink to="/registration" value="registrate" />
      </div>
    );
  }
}

export default FooterForForm;
