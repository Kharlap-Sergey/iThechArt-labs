import React, { PureComponent } from "react";
import Login from "../login/Login";
import Registration from "../registration/Registration";
import logo from "../shared/imgs/account-form.svg";
import "./sign..scss";
class Sign extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.type,
    };
    this.signRef = React.createRef();
  }

  handleSwithcerClick = (event) => {
    const sign = this.signRef.current;
    console.log(sign.style);
    this.setState({ type: [event.target.name] });
  };
  render() {
    return (
      <div className="sign">
        <div className="sign__content sign-content">
          <div className="sign-content__form" ref={this.signRef}>
            <div className="sign-content__switcher sign-switcher">
              <button
                className={`sign-switcher__btn ${
                  this.state.type == "login" ? "sign-switcher__btn--active" : ""
                }`}
                name="login"
                onClick={this.handleSwithcerClick}
              >
                log in
              </button>
              <button
                className={`sign-switcher__btn ${
                  this.state.type == "signup"
                    ? "sign-switcher__btn--active"
                    : ""
                }`}
                name="signup"
                onClick={this.handleSwithcerClick}
              >
                sign up
              </button>
            </div>
            {this.state.type == "login" ? <Login /> : <Registration />}
          </div>
          <img className="sign-content__img" src={logo} />
        </div>
      </div>
    );
  }
}

export default Sign;
