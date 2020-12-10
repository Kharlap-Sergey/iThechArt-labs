import React, { PureComponent } from "react";
import { redirectToAction } from "../shared/redux/redirect/redirectActionCreator";
import { getProfileById } from "../shared/redux/profile/profileActionCreator";
import { connect } from "react-redux";
import AdsPageList from "../shared/components/adsPageList/AdsPageList";
import AccountIformation from "./components/AccountIformation";
import "./profile.scss";
import { loadChatId } from "../shared/redux/chat/chat";

class Profile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { userId: +this.props.match.params.id };
    this.editClickHandler = this.editClickHandler.bind(this);
    this.handleToChatClick = this.handleToChatClick.bind(this);
  }

  componentDidMount() {
    console.log("fetch profile for ", this.state.userId);
    this.props.getProfileById(this.state.userId);
  }

  handleToChatClick(event) {
    this.props.loadChatId(this.state.userId, this.props.userId);
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

          <button onClick={this.handleToChatClick}>ToChat</button>
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
  loadChatId,
};
export default connect(mapStateToPropos, mapDispatchToProps)(Profile);
