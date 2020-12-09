import React, { PureComponent } from "react";
import { loginUserPost } from "../shared/redux/account/account";
import { connect } from "react-redux";
import Loader from "../shared/components/Loader/Loader";
import AccountForm from "../shared/components/accountForm/AccoutForm";
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
    return !this.props.isLoading ? this.content() : <div><Loader /></div>;
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    ...state.accountForm,
    ...state.remoteInteraction,
  };
};

const mapDispatchToProps = { loginUserPost };
export default connect(mapStateToProps, mapDispatchToProps)(Login);