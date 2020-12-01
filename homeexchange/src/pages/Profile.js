import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { redirectClear } from "../redux/redirectActionCreator";
import { getOwnAds } from "../redux/adActionCreator";
import ShortAd from "../components/Ad/ShortAd";
import { deleteOwnAd } from "../redux/adActionCreator";
import Loader from "../components/Loader/Loader";
class Profile extends Component {
  constructor(props) {
    super(props);
  }

  removeHandler = (event) => {
    console.log("click");
    console.log(Object.keys(event.target));
    console.log(event.target[Object.keys(event.target)[1]]);
    let adId = event.target[Object.keys(event.target)[1]]["data-id"];
    console.log(adId);
    this.props.deleteOwnAd(adId);
  };

  componentDidMount() {
    console.log("didMOunt");
    this.props.getOwnAds();
  }
  componentDidUpdate(prevProps) {
    console.log("didUpdate");
    console.log(prevProps);
    console.log(this.props);

    if (this.props.isShouldBeUpdate) {
      this.props.getOwnAds();
    }
  }

  render() {
    console.log("rerender");
    console.log(this.props);
    if (this.props.path) {
      this.props.redirectClear();
      return <Redirect to={this.props.path} />;
    }
    let ads = this.props.ownAds;
    console.log(ads);
    console.log(this.props.isLoading)
    return (
      <div>
        {!this.props.isLoading ? (
          ads.length ? <ul>{(
            ads.map((ad, index) => (
              <ShortAd
                key={index}
                props={ad}
                removable={true}
                removeHandler={this.removeHandler}
              />
            ))
          )}</ul> : (
            <div>nothing to show</div>
          )
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    ...state.redirect,
    ...state.ads,
    ...state.isShouldBeUpdate,
    ...state.isLoading,
  };
};

const mapDispatchToProps = { redirectClear, getOwnAds, deleteOwnAd };
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
