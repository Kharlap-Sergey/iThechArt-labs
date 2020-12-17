import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { getAd, clearAdsAction } from "../../redux/ad/adActionCreator";
import { formateDate, formateNumberToTypeOfAd } from "../../utils/formater";
import "./ad.scss";
import AccountAvatar from "./../accountAvatar/AccountAvatar";
class Ad extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAd(this.props.adId);
  }
  componentWillUnmount() {
    this.props.clearAdsAction();
  }
  handleLessClick(adId, event) {
    this.props.handleLessClick(adId, event);
  }
  render() {
    const ad = this.props.ad;
    console.log("this.props", ad);
    return (
      <div className="ad">
        <div className="ad__header">
          <div className="ad__type">{formateNumberToTypeOfAd(ad.type)}</div>
          <div className="ad__date">{formateDate(ad.dateOfPublication)}</div>
        </div>
        <div className="ad__main">
          <div className="ad__main-info">
            <h2 className="ad__title">{ad.title}</h2>
            <div className="ad__author">
              <AccountAvatar profileId={ad.authorId} />
            </div>
          </div>
          <div className="ad__discription">{ad.description}</div>
          <div className="ad__less">
            <button
              className="ad__less-btn"
              onClick={(e) => {
                this.handleLessClick();
              }}
            >
              less
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.user,
    ad: state.ads.ad,
  };
};
const mapDispatchToProps = {
  getAd,
  clearAdsAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Ad);
