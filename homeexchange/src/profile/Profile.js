import React, { PureComponent } from "react";
import { redirectToAction } from "../shared/redux/redirect/redirectActionCreator";
import { getProfileById } from '../shared/redux/profile/profileActionCreator';
import { connect } from "react-redux";
import AdsPageList from "../shared/components/adsPageList/AdsPageList";
import AccountIformation from "./components/AccountIformation";
import "./profile.scss";

class Profile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {userId: this.props.match.params.id }
  }

  componentDidMount() {
    console.log("fetch profile for ", this.state.userId);
    this.props.getProfileById(this.state.userId);
  }

  render() {
    console.log(this.props);
    return (
      <div className="profile">
        <div className="profile__inf">
          <AccountIformation {...this.props.profile} />
        </div>
        <div className="profile__ads">
          <AdsPageList userId={this.state.userId}></AdsPageList>
        </div>
      </div>
    );
  }
}

const mapStateToPropos = (state) => {
  return { profile: state.profile };
}
const mapDispatchToProps = {
  redirectToAction,
  getProfileById,
};
export default connect(mapStateToPropos, mapDispatchToProps)(Profile);
