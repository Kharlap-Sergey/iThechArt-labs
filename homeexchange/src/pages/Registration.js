import React, { Component } from "react";
import AccountForm from "../components/accountForm/AccountForm";

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  inputsArguments = [
    { placeholder: "firstname", name: "firstname" },
    { placeholder: "lastname", name: "lastname" },
    { placeholder: "nickname", name: "nickname" },
    { placeholder: "e-mail", name: "e-mail" },
    { placeholder: "country", name: "country" },
    { placeholder: "city", name: "city" },
  ];
  formText = (
    <div className="form__text">
      <p>alreade have an account?</p>
      <a href="/login" className="form__link" data-item-content="login">
        login
      </a>
    </div>
  );
  render() {
    return (
      <div>
        <AccountForm
          formText={this.formText}
          inputsArguments={this.inputsArguments}
        />
      </div>
    );
  }
}

export default Registration;
