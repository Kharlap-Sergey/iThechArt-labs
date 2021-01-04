import React, { PureComponent } from "react";
import * as signalR from "@microsoft/signalr";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MessageList from "../messageList/MessageList";
import {
  clearChatAction,
  addChatMessagesAction,
} from "shared/redux/chat/actions";
import { loadChatMessages } from "shared/redux/chat/thunkActions";
import { pathHub } from "shared/utils/path";
import { auth } from "shared/utils/auth";
import "./message-box.scss";
import { selectUser } from "shared/redux/account/selectors";
import { selectMessages } from "shared/redux/chat/selectors";

class MessageBox extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSendClick = this.handleSendClick.bind(this);
    this.scrollDown = this.scrollDown.bind(this);
    this.chatRef = React.createRef();
  }
  static propTypes = {
    user: PropTypes.any.isRequired,
    messages: PropTypes.any.isRequired,
    chatId: PropTypes.number.isRequired,
  };
  hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(pathHub.chat, {
      transport: signalR.HttpTransportType.WebSockets,
      accessTokenFactory: () => auth.getToken(),
    })
    .build();

  handleSendClick(event) {
    event.preventDefault();
    if (event.target.message.value?.length <= 0) {
      return;
    }
    const message = {
      chatId: this.props.chatId,
      content: event.target.message.value,
    };
    this.hubConnection.invoke("Send", message);
    event.target.message.value = "";
  }

  scrollDown() {
    var block = this.chatRef.current;
    block.scrollTop = block.scrollHeight;
  }
  componentDidMount() {
    this.props.clearChatAction();
    this.props.loadChatMessages(this.props.chatId);
    this.hubConnection.start().catch((err) => {});
    this.hubConnection.on("Recieve", (message) => {
      this.props.addChatMessagesAction([message]);
    });
    this.scrollDown();
  }
  componentDidUpdate() {
    this.scrollDown();
  }
  componentWillUnmount() {
    this.props.clearChatAction();
  }
  render() {
    return (
      <div className="message-box" ref={this.chatRef}>
        <MessageList
          scrollDown={this.scrollDown}
          messages={this.props.messages}
          currentUserId={this.props.user.userId}
        />
        <form onSubmit={this.handleSendClick} className="message-box__controls">
          <textarea className="message-box__input" name="message"></textarea>
          <button className="message-box__send">{">"}</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: selectMessages(state),
  user: selectUser(state),
});

const mapDispatchToProps = {
  loadChatMessages,
  addChatMessagesAction,
  clearChatAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(MessageBox);