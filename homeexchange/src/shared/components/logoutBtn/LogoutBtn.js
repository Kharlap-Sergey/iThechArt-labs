import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {logoutAction} from '../../../redux/loginActionsCreator'
import {redirectToAction} from '../../redux/redirect/redirectActionCreator'
import "./logout-btn.scss"
import { auth } from './../../utils/auth';
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
const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
  logoutAction,
  redirectToAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(LogoutBtn);
