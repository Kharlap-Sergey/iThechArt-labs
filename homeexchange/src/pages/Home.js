import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getAllAds } from "../redux/adActionCreator";
import { redirectClear } from "../redux/redirectActionCreator";
import Ad from "../components/Ad/Ad";


class Home extends Component {
  constructor(props) {
    super(props);
    this.props.getAllAds();
  }

  getUserName() {
    console.log("try to get user name");
    console.log(this.props);
    if (this.props && this.props.username)
      return this.props.username;
    return undefined;
  }

  render() {
    if (this.props.path) {
      console.log("redirect");
      this.props.redirectClear();
      return <Redirect to={this.props.path} />;
    }
    let ads = this.props.ads;
    const username = this.getUserName();
    console.log(ads);
    console.log(username);
    return (
      <div>
        <ul>
          {ads ? ads.map((ad, index) => <Ad key={index} props={ad} />) : null}
        </ul>
        {this.getUserName() ?
          (<Link to="/ad/create">create AD</Link>) :
          null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return { ...state.ads, ...state.accountForm, ...state.redirect };
};
const mapDispatchToProps = { getAllAds, redirectClear};
export default connect(mapStateToProps, mapDispatchToProps)(Home);