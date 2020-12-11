import React, { PureComponent } from "react";
import * as signalR from "@microsoft/signalr";
import { auth } from "../shared/utils/auth";
import { pathHub } from "../shared/utils/path";
class Chat extends PureComponent {
  constructor(props) {
    super(props)

    console.log(this.props.match.params.id);
   this.state = {
      chatId: +this.props.match.params.id 
    }
    this.handleSendClick = this.handleSendClick.bind(this)
  }

  hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:44370/hub/chat", {
      transport: signalR.HttpTransportType.WebSockets,
      accessTokenFactory: () => auth.getToken(),
    })
    .build();
  handleSendClick(event) {
    event.preventDefault();
    console.log('event', event.target.message);
    const message = {
      chatId: this.state.chatId,
      content: event.target.message.value
    }
    console.log('message', message)
    this.hubConnection.invoke('Send', message)
  }
  componentDidMount() {
    this.hubConnection.start().catch((err) => {
      console.log(err);
    });
    console.log('this.hubConnection', this.hubConnection);
    this.hubConnection.on("Recieve", (message) => {
      console.log('message recieved', message);
      //this.props.addNotificationsAction([notification]);
    });
  }


  componentWillUnmount() {
    //this.hubConnection.stop();
    //this.props.clearNotificationsAction();
  }
  render() {
    return <div>
      <form onSubmit={this.handleSendClick}>
        <textarea name="message">

        </textarea>
        <button>Send</button>
      </form>
    </div>;
  }
}

export default Chat;
