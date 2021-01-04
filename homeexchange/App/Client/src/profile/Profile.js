import React, { PureComponent } from "react";
import { redirectToAction } from "../shared/redux/redirect/redirectActionCreator";
import {
  cleareProfileAction,
  getProfileById,
} from "../shared/redux/profile/profileActionCreator";
import { connect } from "react-redux";
import AdsPageList from "../shared/components/adsPageList/AdsPageList";
import AccountIformation from "./components/AccountIformation";
import "./profile.scss";
import { loadChatId } from "../shared/redux/chat/thunkActions";
import { path } from "../shared/utils/path";
import bgImg from "../shared/imgs/profile.svg";
import RatingControl from "./components/RatingControl";
import ImgModal from "./components/ImgModal";
import ImgUploader from "./../shared/components/imgUploader/ImgUploader";
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
    if (prev.match.params.id != this.props.match.params.id) {
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
  handleToChatClick(event) {
    this.props.loadChatId(+this.props.match.params.id, this.props.userId);
  }

  handleEditClick(event) {
    this.props.redirectToAction(path.profile.edit(+this.props.match.params.id));
  }
  render() {
    return (
      <div className="profile">
        <div className="profile__inf">
          <AccountIformation {...this.props.profile}>
            {this.props.userId == +this.props.match.params.id ? (
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
                  <ImgModal onClose={this.handleCloseImgModalClick}>
                    <ImgUploader profileId={this.props.userId} />
                  </ImgModal>
                ) : null}
              </>
            ) : null}
            <RatingControl profileId={+this.props.match.params.id} />
            {+this.props.match.params.id == this.props.userId ? (
              <button
                className="profile__edit-btn"
                onClick={this.handleEditClick}
              >
                edit
              </button>
            ) : null}
          </AccountIformation>
          {this.props.userId ? (
            <button
              onClick={this.handleToChatClick}
              className="profile__chat-btn"
            >
              to chat
            </button>
          ) : null}
        </div>
        <div className="profile__ads">
          <AdsPageList userId={+this.props.match.params.id}></AdsPageList>
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
