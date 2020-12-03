import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { auth } from '../../../auth/auth';
import {logoutAction} from '../../../redux/loginActionsCreator'
import {redirectToAction} from '../../../redux/redirectActionCreator'
import "./logout-btn.scss"
class LogoutBtn extends PureComponent {
  logout() {
    console.log("log out event");
    console.log(this.props);
    this.props.logoutAction();
    auth.clearToken();
    this.props.redirectToAction("/");
  }
  
  render() {
    return (
      <button className="logout-btn" onClick={this.logout.bind(this)}>
        logout
      </button>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state.accountForm);
  return state.accountForm;
};

const mapDispatchToProps = {
  logoutAction,
  redirectToAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(LogoutBtn);
