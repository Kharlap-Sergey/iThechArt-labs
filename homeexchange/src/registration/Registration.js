import React from "react";
import { connect } from "react-redux";
import AccountForm from "../shared/components/accountForm/AccoutForm";
import { inputAttributes } from "../shared/utils/inputArguments";
import { registrateUserPost } from "../shared/redux/account/account";
import Loader from "../shared/components/Loader/Loader";

import "./registration.scss";
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

  submeteHandler = (state) => {
    console.log("form was submeted");
    console.log("with arguments", state);

    let user = {
      ...state,
    };
    this.props.registrateUserPost(user);
  };

  accountForm = (
    <AccountForm onSubmit={this.submeteHandler} inputs={this.inputsArguments} />
  );
  render() {
    return (
      <div>
        {this.props.isLoading ? (
          <div className="registration-loader">
            <Loader />
          </div>
        ) : (
          this.accountForm
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return { ...state.accountForm, isLoading: state.loader.registration };
};

const mapDispatchToProps = { registrateUserPost };
export default connect(mapStateToProps, mapDispatchToProps)(Registration);
