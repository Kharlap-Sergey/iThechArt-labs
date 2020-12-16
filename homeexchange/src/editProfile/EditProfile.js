import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { getProfileById } from '../shared/redux/profile/profileActionCreator';
import AccountForm from "../shared/components/accountForm/AccoutForm";
import { inputAttributes } from '../shared/utils/inputArguments';
import { updateUserPost } from './redux/updateUserActionCreator';
import Loader from '../shared/components/Loader/Loader';
import bgImg from "../shared/imgs/repairing.svg"
import "./edit-profile.scss";
class EditProfile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { userId: this.props.match.params.id };
  }

  componentDidMount() {
    console.log("fetch profile for ", this.state.userId);
    this.props.getProfileById(this.state.userId);
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
    console.log("form was submeted");
    console.log("with arguments", state)

    let user = {
      ...state,
    };
    this.props.updateUserPost(user);
  };

  render() {
    console.log(this.props);
    return (
      <div className="edit-profile">
        {/* <div className="profile__inf">
          <AccountIformation {...this.props.profile}>
            {this.state.userId == this.props.userId ? (
              <button className="profile__edit-btn">edit</button>
            ) : null}
          </AccountIformation>
        </div> */}

        <div className="edit-profile__form">
          {this.props.profile.id ? <AccountForm
            onSubmit={this.submeteHandler}
            inputs={this.inputsArguments}
            initialState={this.props.profile}
          /> : <Loader />}
        </div>

        <div className="edit-profile__img-bg-wrapper">
          <img
            className="edit-profile__img-bg"
            src={bgImg}
            alt="hee should be img"
          />
        </div>
      </div>
    );
  }
}

const mapStateToPropos = (state) => {
  return { profile: state.profile, ...state.user };
};
const mapDispatchToProps = {
  getProfileById,
  updateUserPost
};
export default connect(mapStateToPropos, mapDispatchToProps)(EditProfile);
