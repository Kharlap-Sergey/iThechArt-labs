import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Login from "login/Login";
import Registration from "registration/Registration";
import logo from "shared/imgs/account-form.svg";
import "./sign.scss";
import { redirectToAction } from "shared/redux/redirect/actions";
import { path } from "shared/utils/path";

class Sign extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.match?.params?.type ?? "login",
    };
  }

  handleSwithcerClick = (event) => {
    const redirectPath = path.sign[event.target.name];
    this.props.redirectToAction(redirectPath);
  };
  render() {
    return (
      <div className="sign">
        <div className="sign__content sign-content">
          <div className="sign-content__form">
            <div className="sign-content__switcher sign-switcher">
              <button
                className={`sign-switcher__btn ${
                  this.state.type === "login"
                    ? "sign-switcher__btn--active"
                    : ""
                }`}
                name="login"
                onClick={this.handleSwithcerClick}
              >
                log in
              </button>
              <button
                className={`sign-switcher__btn ${
                  this.state.type === "registration"
                    ? "sign-switcher__btn--active"
                    : ""
                }`}
                name="registration"
                onClick={this.handleSwithcerClick}
              >
                sign up
              </button>
            </div>
            {this.state.type === "login" ? <Login /> : <Registration />}
          </div>
          <img className="sign-content__img" src={logo} alt="img" />
        </div>
      </div>
    );
  }
}

export default connect(null, { redirectToAction })(Sign);
