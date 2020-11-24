import React, { Component } from "react";
import AccountForm from "../components/accountForm/AccountForm";

class Login extends Component {
  inputsArguments = [
    { placeholder: "nickname", name: "nickname" },
    { placeholder: "password", name: "password" },
  ];

  submeted(event){
    console.log("form was submeted")
    event.preventDefault();
    //validate
    //отправляем данные на сервер
  }

  formText = (
    <div className="form__text">
      <p>or</p>
      <a
        href="/registration"
        className="form__link"
        data-item-content="registrate"
      >
        registrate
      </a>
    </div>
  );

  render() {
    return (
      <div>
        <AccountForm
          formText={this.formText}
          inputsArguments={this.inputsArguments}
          submeted={this.submeted}
        />
      </div>
    );
  }
}

export default Login;
