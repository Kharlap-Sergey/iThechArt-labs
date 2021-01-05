import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { loginUserPost } from "shared/redux/account/thunkActions";
import Loader from "shared/components/Loader/Loader";
import AccountForm from "shared/components/accountForm/AccoutForm";
import { inputAttributes } from "shared/utils/inputArguments";
import { selectLoginLoaderStatus } from "shared/redux/loader/selectors";
import "./login.scss";

class Login extends PureComponent {
  static propType = {
    isLoading: PropTypes.bool.isRequired,
  }

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

const mapStateToProps = (state) => ({
  isLoading: selectLoginLoaderStatus(state),
});

const mapDispatchToProps = { loginUserPost };
export default connect(mapStateToProps, mapDispatchToProps)(Login);
