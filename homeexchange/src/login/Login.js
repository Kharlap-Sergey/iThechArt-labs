import React, { PureComponent } from "react";
import { Link, Redirect } from "react-router-dom";
import { loginUserPost } from "../redux/loginActionsCreator";
import { redirectClear } from "../redux/redirectActionCreator";
import { connect } from "react-redux";
import Loader from "../components/Loader/Loader";
import AccountForm from "../shered/components/accountForm/AccoutForm";
import PaintedLink from "../shered/components/paintedLink/PaintedLink";

class Login extends PureComponent {
  state = {};
  formText = (
    <div className="form__text">
      <p>or</p>
      <PaintedLink to="/registration" value="registrate"/>
    </div>
  );

  inputsArguments = [
    { placeholder: "e-mail", name: "email", type: "text" },
    { placeholder: "password", name: "password", type: "password" },
  ];

  submeteHandler = (event) => {
    console.log("form was submeted");
    event.preventDefault();

    let user = {
      login: this.state.email,
      password: this.state.password,
    };

    this.props.loginUserPost(user);
  };

  content() {
    return (
      <div>
        <AccountForm
          onSubmit={this.submeteHandler}
          footer={this.formText}
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