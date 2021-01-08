import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { clearAdsAction } from "shared/redux/ad/actions";
import { formatDate, formatNumberToTypeOfAd } from "../../utils/formater";
import AccountAvatar from "shared/components/accountAvatar/AccountAvatar";
import Authorized from "./Authorized";
import { getAd } from "shared/redux/ad/thunkActions";
import { selectAd } from "shared/redux/ad/selectors";
import { selectUser } from "shared/redux/account/selectors";
import "./ad.scss";

export class Ad extends PureComponent {
  componentDidMount() {
    this.props.getAd(this.props.adId);
  }
  handleLessClick(adId, event) {
    this.props.handleLessClick(adId, event);
  }
  render() {
    const ad = this.props.ad;
    return (
      <div className="ad">
        <div className="ad__header">
          <div className="ad__type">{formatNumberToTypeOfAd(ad.type)}</div>
          <div className="ad__date">{formatDate(ad.dateOfPublication)}</div>
        </div>
        <div className="ad__main">
          <div className="ad__main-info">
            <h2 className="ad__title">{ad.title}</h2>
            <div className="ad__author">
              <AccountAvatar profileId={ad.authorId} />
            </div>
          </div>
          <div className="ad__discription">{ad.description}</div>
          {this.props.user.userId && !ad.isResponded ? (
            <Authorized authorId={ad.authorId} adId={ad.id} />
          ) : null}
          {this.handleLessClick ? (
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
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ad: selectAd(state),
  user: selectUser(state),
});

const mapDispatchToProps = {
  getAd,
  clearAdsAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Ad);
