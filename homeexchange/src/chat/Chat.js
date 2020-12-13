import React, { PureComponent } from "react";
import * as signalR from "@microsoft/signalr";
import { auth } from "../shared/utils/auth";
import { pathHub } from "../shared/utils/path";
import { loadChatMessages } from "./../shared/redux/chat/chat";
import { addChatMessagesAction, clearChatAction } from "./../shared/redux/chat/chatActionCreator";
import { connect } from "react-redux";
import MessageList from "./components/MessageList";
import "./chat.scss";

class Chat extends PureComponent {
  constructor(props) {
    super(props);

    console.log(this.props.match.params.id);
    this.state = {
      chatId: +this.props.match.params.id,
    };
    this.handleSendClick = this.handleSendClick.bind(this);
  }

  hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(pathHub.chat, {
      transport: signalR.HttpTransportType.WebSockets,
      accessTokenFactory: () => auth.getToken(),
    })
    .build();

  handleSendClick(event) {
    event.preventDefault();
    console.log("event", event.target.message);
    const message = {
      chatId: this.state.chatId,
      content: event.target.message.value,
    };
    console.log("message", message);
    this.hubConnection.invoke("Send", message);
  }

  componentDidMount() {
    console.log('DIDMOUNT')
    this.props.clearChatAction();
    this.props.loadChatMessages(this.state.chatId);
    this.hubConnection.start().catch((err) => {
      console.log(err);
    });
    console.log("this.hubConnection", this.hubConnection);
    this.hubConnection.on("Recieve", (message) => {
      console.log("message recieved", message);
      this.props.addChatMessagesAction([message]);
    });
  }

  componentWillUnmount() {
    this.props.clearChatAction();
    //this.hubConnection.stop();
    //this.props.clearNotificationsAction();
  }
  render() {
    console.log("this.props", this.props);
    console.log("this.props", this.props.messages);
    return (
      <div className="chat">
        <MessageList
          messages={this.props.messages}
          chatId={this.state.chatId}
          currentUserId={this.props.userId}
        />
        <form onSubmit={this.handleSendClick}>
          <textarea name="message"></textarea>
          <button>Send</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    ...state.chat,
    ...state.user,
  };
};

const mapDispatchToProps = {
  loadChatMessages,
  addChatMessagesAction,
  clearChatAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
