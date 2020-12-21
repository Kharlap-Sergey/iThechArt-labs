import React, { PureComponent } from "react";
import Avatar from "../avatar/Avatar";
import "./account-avatar.scss";
import { connect } from "react-redux";
import { redirectToAction } from "./../../redux/redirect/redirectActionCreator";
import { downloadFile } from "../../redux/imgUploader/imgUploader";

class AccountAvatar extends PureComponent {
  handleClick(event) {
    event.preventDefault();
    console.log(this.props.profileId);
    this.props.profileId &&
      this.props.redirectToAction(`/profile/${this.props.profileId}`);
  }
  render() {
    return (
      <div className="account-avatar" onClick={this.handleClick.bind(this)}>
        <Avatar profileId={this.props.profileId} alternativeMessage="accountAvatar" />
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
