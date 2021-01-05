import React, { PureComponent } from "react";
import { connect } from "react-redux";
import AdsPageList from "shared/components/adsPageList/AdsPageList";
import { redirectToAction } from "shared/redux/redirect/actions";

import homeImg from "shared/imgs/home.svg";
import "./home.scss";

export class Home extends PureComponent {
  render() {
    return (
      <div className="home">
        <AdsPageList/>
        <img className="home__img" src={homeImg} alt={"img"}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  redirectToAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
