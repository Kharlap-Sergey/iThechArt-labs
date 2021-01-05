import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { redirectToAction } from "shared/redux/redirect/redirectActionCreator";
import { auth } from "shared/utils/auth";
import { logoutAction } from "shared/redux/account/actions";
import { path } from "shared/utils/path";
import "./logout-btn.scss";

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
