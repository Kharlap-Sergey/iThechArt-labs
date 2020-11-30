import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { redirectClear } from "../redux/redirectActionCreator";
import { getOwnAds } from "../redux/adActionCreator";
import Ad from "../components/Ad/Ad";
import { deleteOwnAd } from "../redux/adActionCreator";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.props.getOwnAds();
  }

  removeHandler = (event) => {
    console.log("click");
    console.log(Object.keys(event.target));
    console.log(event.target[Object.keys(event.target)[1]]);
    let adId = event.target[Object.keys(event.target)[1]]["data-id"];
    console.log(adId);
    this.props.deleteOwnAd(adId)
  }

  componentDidMount(){
    console.log("didMOunt");
    this.props.getOwnAds();
  }
  render() {
    console.log(this.props);
    if (this.props.path) {
      this.props.redirectClear();
      return <Redirect to={this.props.path} />;
    }
    let ads = this.props.ownAds;
    return (
      <div>
        {ads
          ? ads.map((ad, index) => (
              <Ad
                key={index}
                props={ad}
                removable={true}
                removeHandler={this.removeHandler}
              />
            ))
          : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return { ...state.redirect, ...state.ads};
};

const mapDispatchToProps = { redirectClear, getOwnAds, deleteOwnAd };
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
