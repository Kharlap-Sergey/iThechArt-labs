import React, { PureComponent } from "react";
import { redirectToAction } from "../shared/redux/redirect/redirectActionCreator";
import {getProfileById, getAdsForProfileByUserId} from '../shared/redux/profile/profileActionCreator';
import { connect } from "react-redux";
import AdsPageList from "../shared/components/adsPageList/AdsPageList";
import AccountIformation from "./components/AccountIformation";
import "./profile.scss";

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
  }

  render() {
    console.log(this.props);
    return (
      <div className="profile">
        <div className="profile__inf">
          <AccountIformation {...this.props.profile} />
        </div>
        <div className="profile__ads">
          <AdsPageList></AdsPageList>
        </div>
      </div>
    );
  }
}

const mapStateToPropos = (state) => {
  return {profile: state.profile};
}
const mapDispatchToProps = {
  redirectToAction,
  getProfileById,
};
export default connect(mapStateToPropos, mapDispatchToProps)(Profile);
