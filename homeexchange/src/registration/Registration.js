import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { registrateUserPost } from "../redux/registrationActionCreater";
import { redirectClear } from "../redux/redirectActionCreator";
import PaintedLink from "../shered/components/paintedLink/PaintedLink";
import AccountForm from "../shered/components/accountForm/AccoutForm";

class Registration extends React.PureComponent {
  inputsArguments = [
    { placeholder: "firstname", name: "firstname" },
    { placeholder: "lastname", name: "lastname" },
    { placeholder: "nickname", name: "nickname" },
    { placeholder: "e-mail", name: "email" },
    { placeholder: "country", name: "country" },
    { placeholder: "city", name: "city" },
    { placeholder: "password", name: "password", type: "password", validationAttributes: {minLength: "4", maxLength: "8"} },
  ];

  formText = (
    <div className="form__text">
      <p>alreade have an account?</p>
      <PaintedLink to="/login" value="login" />
    </div>
  );

  submeteHandler = (state) => {
    console.log("form was submeted");
    console.log("with arguments", state)
    
    let user = {
      ...state,
    };
    this.props.registrateUserPost(user);
  };

  render() {
    if (this.props.path) {
      this.props.redirectClear();
      return <Redirect to={this.props.path} />;
    }
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
}

const mapStateToProps = (state) => {
  console.log(state);
  return { ...state.accountForm, ...state.redirect };
};

const mapDispatchToProps = { registrateUserPost, redirectClear };
export default connect(mapStateToProps, mapDispatchToProps)(Registration);
