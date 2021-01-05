import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { getProfileById } from "shared/redux/profile/thunkActions";
import AccountForm from "shared/components/accountForm/AccoutForm";
import { inputAttributes } from "shared/utils/inputArguments";
import Loader from "shared/components/Loader/Loader";
import bgImg from "shared/imgs/repairing.svg";
import { updateUserPost } from 'shared/redux/account/thunkActions';
import { selectProfile } from 'shared/redux/profile/selectors';
import { selectUser } from 'shared/redux/account/selectors';
import { selectRegistrationLoaderStatus } from "shared/redux/loader/selectors";
import PropTypes from 'prop-types'
import "./profile-editor.scss";

class ProfileEditor extends PureComponent {
  componentDidMount() {
    this.props.getProfileById(this.props.match.params.id);
  }
  static propTypes = {
    match: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }

  inputsArguments = [
    inputAttributes.firstname,
    inputAttributes.lastname,
    inputAttributes.nickname,
    inputAttributes.email,
    inputAttributes.country,
    inputAttributes.city,
  ];
  submeteHandler = (state) => {
    let user = {
      ...state,
    };
    this.props.updateUserPost(user);
  };

  render() {
    return (
      <div className="profile-editor">
        <div className="profile-editor__body">
          {!this.props.isLoading ? (
            <div className="profile-editor__form">
              <AccountForm
                onSubmit={this.submeteHandler}
                inputs={this.inputsArguments}
                initialState={this.props.profile}
              />
            </div>
          ) : (
            <Loader />
          )}
        </div>

        <div className="profile-editor__img-bg-wrapper">
          <img
            className="profile-editor__img-bg"
            src={bgImg}
            alt="hee should be img"
          />
        </div>
      </div>
    );
  }
}

const mapStateToPropos = (state) => {
  return {
    profile: selectProfile(state),
    user: selectUser(state),
    isLoading: selectRegistrationLoaderStatus(state),
  };
};
const mapDispatchToProps = {
  getProfileById,
  updateUserPost,
};
export default connect(mapStateToPropos, mapDispatchToProps)(ProfileEditor);
