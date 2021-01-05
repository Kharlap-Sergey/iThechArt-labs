import React, { PureComponent } from "react";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { redirectToAction } from "shared/redux/redirect/actions";
import { path } from 'shared/utils/path';
import Avatar from 'shared/components/avatar/Avatar';
import "./account-avatar.scss";

class AccountAvatar extends PureComponent {
  static propTypes = {
    profileId: PropTypes.number,
  }
  handleClick(event) {
    event.preventDefault();
    this.props.profileId &&
      this.props.redirectToAction(path.profile.to(this.props.profileId));
  }
  render() {
    return (
      <div className="account-avatar" onClick={this.handleClick.bind(this)}>
        <Avatar
          profileId={this.props.profileId}
          alternativeMessage="accountAvatar"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  redirectToAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountAvatar);
