import React, { PureComponent } from "react";
import { redirectToAction } from "../shared/redux/redirect/redirectActionCreator";
import {getProfileById, getAdsForProfileByUserId} from '../shared/redux/profile/profileActionCreator';
import { connect } from "react-redux";
import AdsPageList from "../shared/components/adsPageList/AdsPageList";
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
    //this.props.getProfileById(userId);
    //this.props.getAdsForProfileByUserId(userId);
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
        <div className="profile__ads">
          <AdsPageList></AdsPageList>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  redirectToAction,
  getProfileById,
  getAdsForProfileByUserId
};
export default connect(null, mapDispatchToProps)(Profile);
