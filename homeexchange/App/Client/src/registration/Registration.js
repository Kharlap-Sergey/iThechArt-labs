import React from "react";
import { connect } from "react-redux";
import AccountForm from "shared/components/accountForm/AccoutForm";
import { inputAttributes } from "shared/utils/inputArguments";
import { registrateUserPost } from "shared/redux/account/thunkActions";
import Loader from "shared/components/Loader/Loader";
import "./registration.scss";
import { selectRegistrationLoaderStatus } from "shared/redux/loader/selectors";

class Registration extends React.PureComponent {
  inputsArguments = [
    inputAttributes.firstname,
    inputAttributes.lastname,
    inputAttributes.nickname,
    inputAttributes.email,
    inputAttributes.country,
    inputAttributes.city,
    inputAttributes.language,
    inputAttributes.getPasswordAttributesForRegistration(),
  ];

  submeteHandler = (state) => {
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

const mapStateToProps = (state) => ({
  isLoading: selectRegistrationLoaderStatus(state),
});

const mapDispatchToProps = { registrateUserPost };
export default connect(mapStateToProps, mapDispatchToProps)(Registration);
