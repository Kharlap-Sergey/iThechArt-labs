import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { deleteAd, replyOnAd } from "shared/redux/ad/thunkActions";
import { path } from "shared/utils/path";
import { redirectToAction } from "shared/redux/redirect/actions";
import { selectUser } from 'shared/redux/account/selectors';

class Authorized extends PureComponent {
  constructor(props) {
    super(props)
  
    this.removeClickHandler = this.removeClickHandler.bind(this);
    this.editClickHandler = this.editClickHandler.bind(this);
    this.replyClickHandler = this.replyClickHandler.bind(this);
  }
  
  static propTypes = {
    adId: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
    authorId: PropTypes.number.isRequired,
  }
  
  removeClickHandler() {
    this.props.deleteAd(this.props.adId);
  }
  editClickHandler() {
    this.props.redirectToAction(path.ad.edit(this.props.adId));
  }
  replyClickHandler() {
    this.props.replyOnAd(this.props.adId);
  }
  render() {
    return (
      <div className="ad__action">
        {this.props.user.userId === this.props.authorId ? (
          <>
            <button
              className="ad__action-btn"
              onClick={this.editClickHandler}
              id="ad-action__edit-btn"
            >
              edit
            </button>
            <button
              className="ad__action-btn"
              onClick={this.removeClickHandler}
              id="ad-action__remove-btn"
            >
              remove
            </button>
          </>
        ) : (
          <button
            className="ad__action-btn"
            onClick={this.replyClickHandler}
          >
            reply
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ user: selectUser(state) });

const mapDispatchToProps = {
  deleteAd,
  redirectToAction,
  replyOnAd,
};
export default connect(mapStateToProps, mapDispatchToProps)(Authorized);
