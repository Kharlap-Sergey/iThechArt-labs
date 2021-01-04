import React, { PureComponent } from "react";
import Avatar from "../avatar/Avatar";
import "./account-avatar.scss";
import { connect } from "react-redux";
import { redirectToAction } from "./../../redux/redirect/redirectActionCreator";
import { downloadFile } from "../../redux/imgUploader/imgUploader";
import { path } from './../../utils/path';

class AccountAvatar extends PureComponent {
  handleClick(event) {
    event.preventDefault();
    this.props.profileId &&
      this.props.redirectToAction(path.profile.to(this.props.profileId));
  }
  render() {
    return (
      <div className="account-avatar" onClick={this.handleClick.bind(this)}>
        <Avatar
          profileId={this.props.profileId}
          alternativeMessage="accountAvatar"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  imgs: state.profileImg,
});

const mapDispatchToProps = {
  redirectToAction,
  downloadFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountAvatar);