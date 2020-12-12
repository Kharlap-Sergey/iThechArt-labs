import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { redirectToAction } from "../../redux/redirect/redirectActionCreator";
import { path } from "../../utils/path";
import { } from "../../redux/notifications/notificationActions";
import { deleteNotificationFetch } from "../../redux/notifications/notifications";
class Notification extends PureComponent {
  handleNotificationClick(event) {
    const notId = this.props.notification.id;
    const chatId = this.props.notification.chatId;

    this.props.deleteNotificationFetch(notId);
    this.props.redirectToAction(path.chat + `/id${chatId}`);
  }
  render() {
    return <div onClick={this.handleNotificationClick.bind(this)}
    >{this.props.notification.id}</div>;
  }
}

Notification.propTypes = {
  // eslint-disable-next-line
  notification: PropTypes.object.isRequire,
};

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
  redirectToAction,
  deleteNotificationFetch

}
export default connect(mapStateToProps, mapDispatchToProps)(Notification);
