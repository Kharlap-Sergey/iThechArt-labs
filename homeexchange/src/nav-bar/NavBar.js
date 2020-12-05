import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./nav-bar.scss";
import { logoutAction } from "../redux/loginActionsCreator";
import { redirectToAction } from "../shared/redux/redirect/redirectActionCreator";
import { auth } from "../auth/auth";
import PaintedLink from "../shared/components/paintedLink/PaintedLink";
import Unauthorized from "./components/Unauthorized";
import Authorized from "./components/Authorized";

class NavBar extends React.Component {
  getUserName() {
    if (this.props && this.props.email) return this.props.email;
    return undefined;
  }

  accauntAction = () => {
    let username = this.getUserName();
    if (username) {
      const userId = this.props.userId;
      console.log("user Id", userId);
      return (
        //todo define the account and author.. className
        <li className="menu__item menu__item--authorized account">
          <Authorized userId={userId}></Authorized>
        </li>
      );
    }
    return <Unauthorized></Unauthorized>;
  };

  render() {
    return (
      <nav className="menu">
        <ul className="menu__items">
          <li className="menu__item" key="Home">
            <PaintedLink to="/" value="Home" />
          </li>
          <li className="menu__item menu__item--devider"></li>
          {this.accauntAction()}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return state.user;
};

const mapDispatchToProps = {
  logoutAction,
  redirectToAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
