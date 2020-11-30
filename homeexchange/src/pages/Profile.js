import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {redirectClear} from "../redux/redirectActionCreator";
import {getOwnAds} from "../redux/adActionCreator"
import Ad from '../components/Ad/Ad';
class Profile extends Component {
  constructor(props){
    super(props);
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
        {ads ? ads.map((ad, index) => <Ad key={index} props={ad} removable={true}/>) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {...state.redirect, ...state.ads};
};

const mapDispatchToProps = { redirectClear, getOwnAds };
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
