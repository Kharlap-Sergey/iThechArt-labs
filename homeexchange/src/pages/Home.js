import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllAds } from "../redux/adActionCreator";
import Ad from "../components/Ad/Ad";

class Home extends Component {
  constructor(props) {
    super(props);
    this.props.getAllAds();
  }
  render() {
    let ads = this.props.ads;
    console.log(ads);
    // this.getAllAds();
    // console.log(ads);

    return (
      <div>
        <ul>
          {ads.map((ad, index) => <Ad key={index} props={ad} />)}
        </ul>
        <Link to="/ad/create">create AD</Link>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return state.ads;
};
const mapDispatchToProps = { getAllAds };
export default connect(mapStateToProps, mapDispatchToProps)(Home);