import React, { PureComponent } from "react";
import AdsPageList from "../shared/components/adsPageList/AdsPageList";
import { connect } from "react-redux";
import { redirectToAction } from "./../shared/redux/redirect/redirectActionCreator";

import "./home.scss";

export class Home extends PureComponent {
  createAdClickHandler(event) {
    event.preventDefault();
    this.props.redirectToAction("/ad/create");
  }

  notificationsClickHandler(event) {
    this.props.redirectToAction("/notifications");
  }
  render() {
    return (
      <div className="home">
        <AdsPageList></AdsPageList>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  redirectToAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
