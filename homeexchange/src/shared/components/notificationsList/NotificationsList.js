import React, { PureComponent } from "react";
import { auth } from "./../../utils/auth";
import * as signalR from "@microsoft/signalr";
import {
  addNotificationsAction,
  clearNotificationsAction,
} from "./../../redux/notifications/notificationActions";
import { connect } from "react-redux";
import { getNotificationsFetch } from "./../../redux/notifications/notifications";
import Notification from './../notification/Notification';
class NotificationsList extends PureComponent {
  constructor(props) {
    super(props);
  }
  hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:44370/hub/notification",  {
      accessTokenFactory: () => auth.getToken(),
    })
    .build(); 

  componentDidMount() {
    this.props.getNotificationsFetch();
    this.hubConnection.start().catch((err) => {
      console.log(err);
    });
    this.hubConnection.on("Notify", (notification) => {
      this.props.addNotificationsAction([notification]);
    });
  }

  componentWillUnmount() {
    //this.hubConnection.stop();
    this.props.clearNotificationsAction();
  }

  render() {
    console.log(this.props);
    const notifics = this.props.notifications;
    return (
      <div>
        <ul>
          {notifics.map((not) => (
            <li key={not.id}>
              <Notification notification={not}/>
            </li>
          ))}
        </ul>
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
