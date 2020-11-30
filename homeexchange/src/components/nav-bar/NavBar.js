import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./NavBar.scss";
import { logoutAction } from "../../redux/loginActionsCreator";
import { redirectToHomeFromAction } from "../../redux/redirectActionCreator";
import { auth } from "../../auth/auth";

class NavBar extends React.Component {
  getUserName() {
    if (this.props && this.props.username) return this.props.username;
    return undefined;
  }
  logout() {
    console.log("log out event");
    console.log(this.props);
    this.props.logoutAction();
    auth.clearToken();
    this.props.redirectToHomeFromAction("/");
  }
  accauntAction = () => {
    let username = this.getUserName();
    if (username) {
      return (
        //todo define the account and author.. className
        <li className="menu__item menu__item--authorized account">
          <div className="account__profile">
            <Link
              to="/profile"
              className="menu__href"
              name="username"
              data-item-content={username}
            >
              {username}
            </Link>
          </div>
          <div className="account__logout">
            <button
              className="account__logout-btn"
              onClick={this.logout.bind(this)}
            >
              log out
            </button>
          </div>
        </li>
      );
    }
    return (
      <li className="menu__item menu__item--unauthorized" key="login">
        <Link
          to="/login"
          className="menu__href"
          name="login"
          data-item-content="log in"
        >
          log in
        </Link>
        <Link
          to="/registration"
          className="menu__href"
          name="signup"
          data-item-content="sign up"
        >
          sign up
        </Link>
      </li>
    );
  };

  render() {
    return (
      <nav className="menu">
        <ul className="menu__items">
          <li className="menu__item" key="Home">
            <Link
              to="/"
              className="menu__href"
              name="Home"
              data-item-content="Home"
            >
              Home
            </Link>
          </li>
          <li className="menu__item menu__item--devider"></li>
          {this.accauntAction()}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.accountForm);
  return state.accountForm;
};

const mapDispatchToProps = {
  logoutAction,
  redirectToHomeFromAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
