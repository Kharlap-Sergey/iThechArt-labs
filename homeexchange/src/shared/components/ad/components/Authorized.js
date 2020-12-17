import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { deleteAd, replyOnAd } from "../../../redux/ad/adActionCreator";
import { redirectToAction } from './../../../redux/redirect/redirectActionCreator';
class Authorized extends PureComponent {
  removeClickHandler(event) {
    this.props.deleteAd(this.props.adId);
  }
  editClickHandler(event) {
    this.props.redirectToAction(`/ad/edite/id${this.props.adId}`);
  }
  replyClickHandler(event) {
    console.log(this.props.adId);
    this.props.replyOnAd(this.props.adId);
  }
  render() {
    return (
      <div className="ad__action">
        {this.props.userId === this.props.authorId ? (
          <>
            <button
              className="ad__action-btn"
              onClick={this.editClickHandler.bind(this)}
            >
              edit
            </button>
            <button
              className="ad__action-btn"
              onClick={this.removeClickHandler.bind(this)}
            >
              remove
            </button>
          </>
        ) : (
          <button
            className="ad__action-btn"
            onClick={this.replyClickHandler.bind(this)}
          >
            reply
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ ...state.user });

const mapDispatchToProps = {
  deleteAd,
  redirectToAction,
  replyOnAd,
};
export default connect(mapStateToProps, mapDispatchToProps)(Authorized);
