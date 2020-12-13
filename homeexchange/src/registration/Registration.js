import React from "react";
import { connect } from "react-redux";

import PaintedLink from "../shared/components/paintedLink/PaintedLink";
import AccountForm from "../shared/components/accountForm/AccoutForm";
import { inputAttributes } from "../shared/utils/inputArguments";
import { registrateUserPost } from "../shared/redux/account/account";
import Loader from "../shared/components/Loader/Loader";
import { path } from "../shared/utils/path";

class Registration extends React.PureComponent {
  inputsArguments = [
    inputAttributes.firstname,
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
      <div className="account-form-link">
        <PaintedLink to={path.login} value="login" />
      </div>
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

  accountForm = (
    <AccountForm
          onSubmit={this.submeteHandler}
          footer={this.formText}
          inputs={this.inputsArguments}
        />
  )  
  render() {
    return (
      <div>
        {this.props.isLoading 
          ? <Loader/>
          : this.accountForm}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return { ...state.accountForm, isLoading: state.loader.registration};
};

const mapDispatchToProps = { registrateUserPost };
export default connect(mapStateToProps, mapDispatchToProps)(Registration);
