import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { redirectToAction } from "../../redux/redirect/redirectActionCreator";
import "./logout-btn.scss";
import { auth } from "./../../utils/auth";
import { logoutAction } from "./../../redux/account/accountActions";
import { path } from "../../utils/path";
class LogoutBtn extends PureComponent {
  logout() {
    this.props.logoutAction();
    auth.clearToken();
    this.props.redirectToAction(path.home);
  }

  render() {
    return (
      <button className="logout-btn" onClick={this.logout.bind(this)}>
        logout
      </button>
    );
  }
}
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  logoutAction,
  redirectToAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(LogoutBtn);
