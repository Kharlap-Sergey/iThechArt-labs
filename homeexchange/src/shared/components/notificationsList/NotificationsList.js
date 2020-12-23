import React, { PureComponent } from "react";
import { auth } from "./../../utils/auth";
import * as signalR from "@microsoft/signalr";
import {
  addNotificationsAction,
  clearNotificationsAction,
} from "./../../redux/notifications/notificationActions";
import { connect } from "react-redux";
import { getNotificationsFetch } from "./../../redux/notifications/notifications";
import Notification from "./../notification/Notification";
import "./notifications-list.scss";
import { pathHub } from './../../utils/path';
class NotificationsList extends PureComponent {
  constructor(props) {
    super(props);

    this.deNotify = this.deNotify.bind(this);
  }
  hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(pathHub.notification, {
      accessTokenFactory: () => auth.getToken(),
    })
    .build();

  componentDidMount() {
    this.props.getNotificationsFetch();
    this.hubConnection.start().catch((err) => {
    });
    this.hubConnection.on("Notify", (notification) => {
      this.props.addNotificationsAction([notification]);
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.notifications.length < this.props.notifications.length) {
      this.props.notify?.call();
    }
  }
  componentWillUnmount() {
    this.props.clearNotificationsAction();
  }

  deNotify(event) {
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
  notifications: [...state.notifications],
});

const mapDispatchToProps = {
  addNotificationsAction,
  getNotificationsFetch,
  clearNotificationsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsList);
