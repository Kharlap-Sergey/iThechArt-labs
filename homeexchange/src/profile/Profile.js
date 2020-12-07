import React, { PureComponent } from "react";
import { redirectToAction } from "../shared/redux/redirect/redirectActionCreator";
import { getProfileById } from "../shared/redux/profile/profileActionCreator";
import { connect } from "react-redux";
import AdsPageList from "../shared/components/adsPageList/AdsPageList";
import AccountIformation from "./components/AccountIformation";
import "./profile.scss";

class Profile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { userId: this.props.match.params.id };
    this.editClickHandler = this.editClickHandler.bind(this)
  }

  componentDidMount() {
    console.log("fetch profile for ", this.state.userId);
    this.props.getProfileById(this.state.userId);
  }

  editClickHandler(event) {
    this.props.redirectToAction(`/edit/profile/${this.state.userId}`);
  }
  render() {
    console.log(this.props);
    return (
      <div className="profile">
        <div className="profile__inf">
          <AccountIformation {...this.props.profile}>
            {this.state.userId == this.props.userId ? (
              <button
                className="profile__edit-btn"
                onClick={this.editClickHandler}
              >
                edit
              </button>
            ) : null}
          </AccountIformation>
        </div>
        <div className="profile__ads">
          <AdsPageList userId={this.state.userId}></AdsPageList>
        </div>
      </div>
    );
  }
}

const mapStateToPropos = (state) => {
  return { profile: state.profile, ...state.user };
};
const mapDispatchToProps = {
  redirectToAction,
  getProfileById,
};
export default connect(mapStateToPropos, mapDispatchToProps)(Profile);
