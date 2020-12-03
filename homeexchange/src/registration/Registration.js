import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { registrateUserPost } from "./redux/registrationActionCreater";
import { redirectClear } from "../shared/redux/redirect/redirectActionCreator";
import PaintedLink from "../shared/components/paintedLink/PaintedLink";
import AccountForm from "../shared/components/accountForm/AccoutForm";
import { inputAttributes } from "../shared/utils/inputArguments";

class Registration extends React.PureComponent {
  inputsArguments = [
    inputAttributes.firstname ,
    inputAttributes.lastname,
    inputAttributes.nickname,
    inputAttributes.email,
    inputAttributes.country,
    inputAttributes.city,
    inputAttributes.getPasswordAttributesForRegistration(),
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
      <div className>
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
