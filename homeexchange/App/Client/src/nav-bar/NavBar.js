import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./nav-bar.scss";
import { logoutAction } from "shared/redux/account/actions";
import { redirectToAction } from "shared/redux/redirect/actions";
import PaintedLink from "shared/components/paintedLink/PaintedLink";
import Unauthorized from "./components/unauthorized/Unauthorized";
import Authorized from "./components/authorized/Authorized";
import { path } from "shared/utils/path";
import { selectUser } from "shared/redux/account/selectors";

class NavBar extends PureComponent {
  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string,
      userId: PropTypes.number,
    }),
  };

  getUserName() {
    return this.props.user?.email;
  }

  getProfileContent = () => {
    let username = this.getUserName();
    if (username) {
      const userId = this.props.user.userId;
      return <Authorized userId={userId} />;
    }
    return (
      <li className="menu__item menu__item--unauthorized" key="unauthorized">
        <Unauthorized/>
      </li>
    );
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

const mapStateToProps = (state) => ({
  user: selectUser(state),
});

const mapDispatchToProps = {
  logoutAction,
  redirectToAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
