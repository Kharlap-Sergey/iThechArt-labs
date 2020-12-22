import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { redirectToAction } from "../../redux/redirect/redirectActionCreator";
import { path } from "../../utils/path";
import { } from "../../redux/notifications/notificationActions";
import { deleteNotificationFetch } from "../../redux/notifications/notifications";
import "./notification.scss"
class Notification extends PureComponent {
  handleNotificationClick(event) {
    const notId = this.props.notification.id;
    const chatId = this.props.notification.chatId;

    this.props.deleteNotificationFetch(notId);
    this.props.redirectToAction(path.chat(chatId));
  }
  render() {
    return <div className="notification" onClick={this.handleNotificationClick.bind(this)}
    >You have a new response</div>;
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
