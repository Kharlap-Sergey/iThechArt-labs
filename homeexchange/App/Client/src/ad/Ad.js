import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loader from "shared/components/Loader/Loader";
import { clearAdsAction, getAd } from "shared/redux/ad/adActionCreator";
import { formateDate, formateNumberToTypeOfAd } from "shared/utils/formater";
import "./ad.scss";
import { selectAd } from "shared/redux/ad/selectors";

class Ad extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { adId: this.props.match.params.id };
  }

  static propTypes = {
    ad: PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      dateOfPublication: PropTypes.any.isRequired,
    }),
    match: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getAd(this.state.adId);
  }

  componentWillUnmount() {
    this.props.clearAdsAction();
  }

  getAdContent = (ad) => (
    <div className="ad-responded">
      <div className="ad-responded__main ad-responded-main">
        <h2 className="ad-responded-main__title">{ad.title}</h2>
        <div className="ad-responded-main__type">
          {formateNumberToTypeOfAd(ad.type)}
        </div>
        <div className="ad-responded-main__date">
          {formateDate(ad.dateOfPublication)}
        </div>
        <div className="ad-responded-main__description">{ad.description}</div>
      </div>
    </div>
  );

  render() {
    const ad = this.props.ad;
    return ad.title ? this.getAdContent(ad) : <Loader />;
  }
}

const mapStateToProps = (state) => {
  return {
    ad: selectAd(state),
  };
};

const mapDispatchToProps = {
  getAd,
  clearAdsAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Ad);
