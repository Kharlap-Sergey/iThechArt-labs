import React, { PureComponent } from "react";
import { loginUserPost } from "../shared/redux/account/account";
import { connect } from "react-redux";
import Loader from "../shared/components/Loader/Loader";
import AccountForm from "../shared/components/accountForm/AccoutForm";
import { inputAttributes } from "../shared/utils/inputArguments";
import "./login.scss";
class Login extends PureComponent {
  state = {};
  inputsArguments = [
    inputAttributes.email,
    inputAttributes.getPasswordAttributesForLogin(),
  ];

  handleSubmit = (state) => {
    let account = {
      login: state.email,
      password: state.password,
    };

    this.props.loginUserPost(account);
  };
  content = (
    <div className="login-form-container">
      <AccountForm onSubmit={this.handleSubmit} inputs={this.inputsArguments} />
    </div>
  );

  render() {
    return !this.props.isLoading ? (
      this.content
    ) : (
      <div className="login-loader">
        <Loader />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    ...state.accountForm,
    isLoading: state.loader.login,
  };
};

const mapDispatchToProps = { loginUserPost };
export default connect(mapStateToProps, mapDispatchToProps)(Login);
