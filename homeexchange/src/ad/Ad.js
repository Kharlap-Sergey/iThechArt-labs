import React, { PureComponent } from "react";
import { connect } from "react-redux";
import AccountAvatar from "../shared/components/accountAvatar/AccountAvatar";
import Loader from "../shared/components/Loader/Loader";
import { clearAdsAction, getAd } from "../shared/redux/ad/adActionCreator";
import { formateDate, formateNumberToTypeOfAd } from "../shared/utils/formater";

import "./ad.scss";
import Authorized from "./components/Authorized";

class Ad extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { adId: this.props.match.params.id };
  }

  componentDidMount() {
    this.props.getAd(this.state.adId);
  }
  componentWillUnmount() {
    this.props.clearAdsAction();
  }

  getAdContent = (ad) => (
    <div className="ad">
      <div className="ad__aside">
        {this.props.userId != ad.authorId ? (
          <AccountAvatar profileId={ad.authorId}></AccountAvatar>
        ) : null}
      </div>
      <div className="ad__main ad-main">
        <h2 className="ad-main__title">{ad.title}</h2>
        <div className="ad-main__type">{formateNumberToTypeOfAd(ad.type)}</div>
        <div className="ad-main__date">{formateDate(ad.dateOfPublication)}</div>
        <div className="ad-main__description">{ad.description}</div>
        {this.props.userId ? <Authorized authorId={ad.authorId} adId={ad.id} /> : null}
      </div>
    </div>
  );

  render() {
    console.log("render");
    const ad = this.props.ad;
    console.log(ad);
    return ad ? this.getAdContent(ad) : <Loader />;
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
