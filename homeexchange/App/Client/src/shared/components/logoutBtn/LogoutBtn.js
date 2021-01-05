import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { applyLogoutSettings } from "shared/redux/account/thunkActions";
import "./logout-btn.scss";

class LogoutBtn extends PureComponent {
  logout() {
    this.props.applyLogoutSettings();
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
  applyLogoutSettings
};
export default connect(mapStateToProps, mapDispatchToProps)(LogoutBtn);
