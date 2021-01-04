import React, { Fragment } from "react";
import { connect } from "react-redux";
import "./nav-bar.scss";
import { logoutAction } from "../shared/redux/account/accountActions";
import { redirectToAction } from "../shared/redux/redirect/redirectActionCreator";
import PaintedLink from "../shared/components/paintedLink/PaintedLink";
import Unauthorized from "./components/Unauthorized";
import Authorized from "./components/Authorized";
import { path } from "../shared/utils/path";

class NavBar extends React.Component {
  getUserName() {
    if (this.props && this.props.email) return this.props.email;
    return undefined;
  }

  getProfileContent = () => {
    let username = this.getUserName();
    if (username) {
      const userId = this.props.userId;
      return (
        <Fragment>
          <Authorized userId={userId}></Authorized>
        </Fragment>
      );
    }
    return <Unauthorized></Unauthorized>;
  };

  render() {
    return (
      <div className="nav-bar">
        <nav className="menu">
          <ul className="menu__items">
            <li className="menu__item" key="Home">
              <PaintedLink to={path.home} value="Home" />
            </li>
            <li className="menu__item menu__item--devider"></li>
            {this.getProfileContent()}
          </ul>
        </nav>
      </div>
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