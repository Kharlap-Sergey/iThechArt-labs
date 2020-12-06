import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { redirectToAction } from "../../redux/redirect/redirectActionCreator";
import AccountAvatar from "../accountAvatar/AccountAvatar";
import "./short-ad.scss";

class ShortAd extends PureComponent {
  constructor(props) {
    super(props)

    this.clickHandler = this.clickHandler.bind(this)
  }
  formatDate(dateString) {
    const date = new Date(dateString)
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth();

    return `${month}/${day}/${year}`;
  }

  clickHandler(event) {
    this.props.redirectToAction(`/ad/${this.props.adId}`)
  }

  render() {
    console.log(this.props);
    return (
      <div className="short-ad">
        {
          this.props.shouldAvatarDisplay && (
            <div className="short-ad__aside">
              <div className="short-ad__account-avatar">
                <AccountAvatar />
              </div>
            </div>
          )
        }
        <div className="short-ad__main">
          <h2 className="short-ad__title">{this.props.title}</h2>
          <div className="short-ad__date">{this.formatDate(this.props.date)}</div>
          <div className="short-ad__type">{this.props.typ}</div>
          <div className="short-ad__discription">{this.props.description}</div>
          <div className="short-ad__more">
            <button onClick={this.clickHandler}>more</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  redirectToAction
}

export default connect(null, mapDispatchToProps)(ShortAd);
