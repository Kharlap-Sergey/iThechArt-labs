import React, { PureComponent } from "react";
import * as signalR from "@microsoft/signalr";
import {
  clearNotificationsAction,
} from "shared/redux/notifications/actions";
import { connect } from "react-redux";
import { getNotificationsFetch } from "shared/redux/notifications/thunkActions";
import Notification from "shared/components/notification/Notification";
import "./notifications-list.scss";
import { selectNotifications } from './../../redux/notifications/selectors';

class NotificationsList extends PureComponent {
  constructor(props) {
    super(props);

    this.deNotify = this.deNotify.bind(this);
  }

  componentDidMount() {
    this.props.getNotificationsFetch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.notifications.length < this.props.notifications.length) {
      this.props.notify?.call();
    }
  }
  componentWillUnmount() {
    this.props.clearNotificationsAction();
  }

  deNotify() {
    this.props.deNotify?.call();
  }
  render() {
    const notifics = this.props.notifications;
    return (
      <div className="notifications" onMouseOver={this.deNotify}>
        {notifics.length > 0 ? (
          <ul className="notifications__list">
            {notifics.map((not) => (
              <li className="notifications__item" key={not.id}>
                <Notification notification={not} />
              </li>
            ))}
          </ul>
        ) : (
          "Yuo don't have notifications"
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notifications: selectNotifications(state),
});

const mapDispatchToProps = {
  getNotificationsFetch,
  clearNotificationsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsList);
