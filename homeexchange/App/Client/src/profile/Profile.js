import React, { PureComponent } from "react";
import { redirectToAction } from "shared/redux/redirect/actions";
import { getProfileById } from "shared/redux/profile/thunkActions";
import { cleareProfileAction } from "shared/redux/profile/actions";
import { connect } from "react-redux";
import AdsPageList from "shared/components/adsPageList/AdsPageList";
import AccountIformation from "./components/accountInformation/AccountIformation";
import { loadPrivateRoomId } from "shared/redux/chat/thunkActions";
import { path } from "shared/utils/path";
import bgImg from "shared/imgs/profile.svg";
import RatingControl from "./components/ratingControl/RatingControl";
import ImgUploader from "shared/components/imgUploader/ImgUploader";
import { selectProfile } from "shared/redux/profile/selectors";
import { selectUser } from "shared/redux/account/selectors";
import Modal from "shared/components/modal/Modal";
import "./profile.scss";

class Profile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { isImgModalOpen: false };
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleToChatClick = this.handleToChatClick.bind(this);
    this.handleOpenImgModalClick = this.handleOpenImgModalClick.bind(this);
    this.handleCloseImgModalClick = this.handleCloseImgModalClick.bind(this);
  }

  componentDidMount() {
    this.props.getProfileById(+this.props.match.params.id);
  }
  componentDidUpdate(prev) {
    if (prev.match.params.id !== this.props.match.params.id) {
      this.props.getProfileById(+this.props.match.params.id);
    }
  }
  componentWillUnmount() {
    this.props.cleareProfileAction();
  }

  handleOpenImgModalClick(e) {
    this.setState({ isImgModalOpen: true });
  }
  handleCloseImgModalClick(e) {
    this.setState({ isImgModalOpen: false });
  }
  handleToChatClick() {
    this.props.loadChatId(+this.props.match.params.id, this.props.user.userId);
  }

  handleEditClick() {
    this.props.redirectToAction(path.profile.edit(+this.props.match.params.id));
  }

  getProfileInformation() {
    return (
      <div className="profile__inf">
        <AccountIformation {...this.props.profile}>
          {this.props.user.userId === +this.props.match.params.id ? (
            <>
              <div className="profile__open-btn-wrapper">
                <button
                  className="profile__open-btn"
                  onClick={this.handleOpenImgModalClick}
                >
                  <div className="">+</div>
                </button>
              </div>
              {this.state.isImgModalOpen ? (
                <Modal onClose={this.handleCloseImgModalClick}>
                  <ImgUploader profileId={this.props.user.userId} />
                </Modal>
              ) : null}
            </>
          ) : null}
          <RatingControl profileId={+this.props.match.params.id} />
          {+this.props.match.params.id === this.props.user.userId ? (
            <button
              className="profile__edit-btn"
              onClick={this.handleEditClick}
            >
              edit
            </button>
          ) : null}
        </AccountIformation>
        {this.props.user.userId ? (
          <button
            onClick={this.handleToChatClick}
            className="profile__chat-btn"
          >
            to chat
          </button>
        ) : null}
      </div>
    );
  }
  render() {
    return (
      <div className="profile">
        {this.props.profile.id ? (
          this.getProfileInformation()
        ) : (
          <div className="profile__inf" />
        )}
        <div className="profile__ads">
          <AdsPageList userId={+this.props.match.params.id}/>
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

const mapStateToPropos = (state) => ({
  profile: selectProfile(state),
  user: selectUser(state),
});
const mapDispatchToProps = {
  redirectToAction,
  getProfileById,
  loadChatId: loadPrivateRoomId,
  cleareProfileAction,
};
export default connect(mapStateToPropos, mapDispatchToProps)(Profile);
