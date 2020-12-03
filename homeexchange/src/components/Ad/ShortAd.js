import React from "react";
import { connect } from "react-redux";
import {redirectToAction} from "../../shared/redux/redirect/redirectActionCreator"; 
class ShortAd extends React.Component {
  constructor(props) {
    super(props);
  }

  moreClickHandler(event){   
    const redirectPath = "/ad/"+event.target.dataset.adId;
    console.log("redirect path", redirectPath)
    this.props.redirectToAction(redirectPath);
  }

  render() {
    console.log(this.props);
    let ad = this.props.props;
    return (
      <li className="ads__item ad">
        <div className="ad__title">
          <span className="ad__title-text">{ad.title}</span>
          <span className="ad__creation-date">{ad.dateOfPublication}</span>
        </div>
        <div className="ad__more">
          <button className="ad__more-btn" onClick={this.moreClickHandler.bind(this)} data-ad-id={ad.id}>more</button>
          <div className="ad__author-profile">
            <a href="" className="ad__author-href"></a>
          </div>
        </div>
        {this.props.removable ? (
          <div>
            <button onClick={this.props.removeHandler} data-id={ad.id}>remove</button>
          </div>
        ) : null}
      </li>
    );
  }
}

const mapDispatchToProps = {redirectToAction}
export default connect(null, mapDispatchToProps)(ShortAd);
