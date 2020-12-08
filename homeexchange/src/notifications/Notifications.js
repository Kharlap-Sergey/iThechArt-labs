import React, { PureComponent } from "react";
import { auth } from "./../shared/utils/auth";
import * as signalR from "@microsoft/signalr";

class Notifications extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { notifications: [] };
  }
  hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:44370/notification", {
      accessTokenFactory: () => auth.getToken(),
    })
    .build();

  componentDidMount() {
    this.hubConnection.start().catch((err) => {
      console.log(err);
    });
    this.hubConnection.on("Notify", (notification) => {
      console.log(notification);
      console.log(this.state)
      this.setState((state) => ({
        notifications: [...state.notifications, notification],
      }));
    });
  }
  render() {
    return <div style={{ color: "red" }}>Notifications</div>;
  }
}

export default Notifications;
