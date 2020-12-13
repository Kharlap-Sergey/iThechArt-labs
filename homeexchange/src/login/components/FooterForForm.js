import React, { PureComponent } from "react";
import PaintedLink from "../../shared/components/paintedLink/PaintedLink";
import { path } from "../../shared/utils/path";

class FooterForForm extends PureComponent {
  render() {
    return (
      <div className="form__text">
        <p>or</p>
        <div className="account-form-link">
        <PaintedLink to={path.registration} value="registrate" />
        </div>
      </div>
    );
  }
}

export default FooterForForm;
