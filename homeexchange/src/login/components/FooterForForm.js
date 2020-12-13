import React, { PureComponent } from "react";
import PaintedLink from "../../shared/components/paintedLink/PaintedLink";

class FooterForForm extends PureComponent {
  render() {
    return (
      <div className="form__text">
        <p>or</p>
        <div className="account-form-link">
        <PaintedLink to="/registration" value="registrate" />
        </div>
      </div>
    );
  }
}

export default FooterForForm;
