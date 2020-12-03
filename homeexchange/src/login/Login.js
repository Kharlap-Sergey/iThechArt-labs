import React, { PureComponent } from "react";
import { Link, Redirect } from "react-router-dom";
import { loginUserPost } from "../redux/loginActionsCreator";
import { redirectClear } from "../redux/redirectActionCreator";
import { connect } from "react-redux";
import Loader from "../shared/components/Loader/Loader";
import AccountForm from "../shared/components/accountForm/AccoutForm";
import PaintedLink from "../shared/components/paintedLink/PaintedLink";
import { inputAttributes } from "../shared/utils/inputArguments";
import "./login.scss"
import FooterForForm from "./components/FooterForForm";
class Login extends PureComponent {
  state = {};
  inputsArguments = [
    inputAttributes.email,
    inputAttributes.getPasswordAttributesForLogin(),
  ];

  submeteHandler = (state) => {
    console.log("form was submeted");
    console.log("with arguments", state)
    
    let account = {
      login: state.email,
      password: state.password,
    };

    this.props.loginUserPost(account);
  };
  footerForeForm = (<FooterForForm/>)
  content() {
    return (
      <div className="loginFormContainer">
        <AccountForm
          onSubmit={this.submeteHandler}
          footer={this.footerForeForm}
          inputs={this.inputsArguments}
        />
      </div>
    );
  }
  render() {
    if (this.props.path) {
      this.props.redirectClear();
      return <Redirect to={this.props.path} />;
    }
    return !this.props.isLoading ? this.content() : <div><Loader /></div>;
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    ...state.accountForm,
    ...state.redirect,
    ...state.remoteInteraction,
  };
};

const mapDispatchToProps = { loginUserPost, redirectClear };
export default connect(mapStateToProps, mapDispatchToProps)(Login);