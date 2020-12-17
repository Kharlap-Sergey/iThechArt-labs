import React, { PureComponent } from "react";
import { redirectToAction } from "../shared/redux/redirect/redirectActionCreator";
import { cleareProfileAction, getProfileById } from "../shared/redux/profile/profileActionCreator";
import { connect } from "react-redux";
import AdsPageList from "../shared/components/adsPageList/AdsPageList";
import AccountIformation from "./components/AccountIformation";
import "./profile.scss";
import { loadChatId } from "../shared/redux/chat/chat";
import { path } from "../shared/utils/path";
import bgImg from '../shared/imgs/profile.svg'
class Profile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { userId: +this.props.match.params.id };
    this.editClickHandler = this.handleEditClick.bind(this);
    this.handleToChatClick = this.handleToChatClick.bind(this);
  }

  componentDidMount() {
    console.log("fetch profile for ", this.state.userId);
    this.props.getProfileById(this.state.userId);
  }
  componentWillUnmount() {
    this.props.cleareProfileAction()
  }

  handleToChatClick(event) {
    console.log(this.state.userId, this.props.userId)
    this.props.loadChatId(this.state.userId, this.props.userId);
  }

  handleEditClick(event) {
    this.props.redirectToAction(path.profile.edit(this.state.userId));
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
                onClick={this.handleEditClick}
              >
                edit
              </button>
            ) : null}
          </AccountIformation>
            {this.props.userId 
            ? <button onClick={this.handleToChatClick} className="profile__chat-btn">ToChat</button>
            : null}
          
        </div>
        <div className="profile__ads">
          <AdsPageList userId={this.state.userId}></AdsPageList>
        </div>

        <div className="profile__img-bg-wrapper">
          <img
            className="profile__img-bg"
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
  redirectToAction,
  getProfileById,
  loadChatId,
  cleareProfileAction,
};
export default connect(mapStateToPropos, mapDispatchToProps)(Profile);
