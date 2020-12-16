import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { redirectToAction } from "../../redux/redirect/redirectActionCreator";
import { formateNumberToTypeOfAd } from "../../utils/formater";
import AccountAvatar from "../accountAvatar/AccountAvatar";
import "./short-ad.scss";

class ShortAd extends PureComponent {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }
  formatDate(dateString) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth();

    return `${monthNames[month]} ${day}`;
  }

  clickHandler(event) {
    this.props.redirectToAction(`/ad/id${this.props.adId}`);
  }

  render() {
    console.log(this.props);
    return (
      <div className="short-ad">
        <div className="short-ad__header">
          <div className="short-ad__type">
            {formateNumberToTypeOfAd(this.props.typ)}
          </div>
          <div className="short-ad__date">
            {this.formatDate(this.props.date)}
          </div>
        </div>
        <div className="short-ad__main">
          <h2 className="short-ad__title">{this.props.title}</h2>
          <div className="short-ad__discription">{this.props.description}</div>
          <div className="short-ad__more">
            <button className="short-ad__more-btn" onClick={this.clickHandler}>more</button>
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
