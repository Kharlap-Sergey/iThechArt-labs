import React, { PureComponent } from "react";
import { redirectToAction } from "../shared/redux/redirect/redirectActionCreator";
import {getProfileById} from '../shared/redux/profile/profileActionCreator';
import { connect } from "react-redux";
class Profile extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let url = window.location.href;
    let parts = url.split("/");
    let userId = parts[parts.length - 1];
    if (!userId) {
      return;
    }
    console.log("fetch profile for ", userId)
    this.props.getProfileById(userId);
    //this.props.getAdsForUserByUserId(userId);
  }

  render() {
    return (
      <div className="profile profile__body">
        profile
        <div className="profile__inf">
          <div className="profile__avatar"></div>
          <div className="profile__information"></div>
          <div className="profile__editor"></div>
        </div>
        <div className="profile__ads"></div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  redirectToAction,
  getProfileById
};
export default connect(null, mapDispatchToProps)(Profile);
