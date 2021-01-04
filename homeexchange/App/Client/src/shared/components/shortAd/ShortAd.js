import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { redirectToAction } from "shared/redux/redirect/redirectActionCreator";
import { formatNumberToTypeOfAd, formatDate } from "shared/utils/formater";
import "./short-ad.scss";

class ShortAd extends PureComponent {
  static propTypes = {
    typ: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    adId: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }

  handleMoreClick(adId, event) {
    this.props.handleMoreClick(adId, event);
  }

  render() {
    return (
      <div className="short-ad">
        <div className="short-ad__header">
          <div className="short-ad__type">
            {formatNumberToTypeOfAd(this.props.typ)}
          </div>
          <div className="short-ad__date">
            {formatDate(this.props.date)}
          </div>
        </div>
        <div className="short-ad__main">
          <h2 className="short-ad__title">{this.props.title}</h2>
          <div className="short-ad__discription">{this.props.description}</div>
          <div className="short-ad__more">
            <button
              className="short-ad__more-btn"
              onClick={(e) => {
                this.handleMoreClick(this.props.adId, e);
              }}
            >
              more
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  redirectToAction,
};

export default connect(null, mapDispatchToProps)(ShortAd);
