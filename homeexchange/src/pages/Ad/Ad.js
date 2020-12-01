import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import {getAd, replyOnAd} from "../../redux/adActionCreator";
import {redirectClear} from "../../redux/redirectActionCreator";

class Ad extends Component {
  componentDidMount() {
    let url = window.location.href;
    let parts = url.split("/");
    let id = parts[parts.length - 1];
    console.log(url);
    console.log(id);
    this.props.getAd(id);
  }

  subscribeHandler(event){
    const adId = event.target.dataset.adId
    console.log("subscribe on", adId);
    this.props.replyOnAd(adId);
  }

  content(){
    console.log(this.props);
    const ad = this.props.ad;
    return (<div>
      <div className="">{ad.id}</div>
      <div className="">{ad.title}</div>
      <div className="">{ad.description}</div>
      <button onClick={this.subscribeHandler.bind(this)} data-ad-id={ad.id}>subscribe</button>
    </div>)
  }

  render() {
    if (this.props.path) {
      console.log("redirect");
      this.props.redirectClear();
      return <Redirect to={this.props.path} />;
    }

    return <div>{!this.props.isLoading ? this.content() : <Loader />}</div>
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.redirect,
    ...state.accountForm,
    ad: state.ads.ad,
    ...state.remoteInteraction
  };
}

const mapDispatchToProps = {
  getAd,
  redirectClear,
  replyOnAd
}
export default connect(mapStateToProps, mapDispatchToProps)(Ad);
