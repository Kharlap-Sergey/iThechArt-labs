import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Message from "./Message";
class MessageList extends PureComponent {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    messages: PropTypes.array.isRequired,
    chatId: PropTypes.number.isRequired,
    currentUserid: PropTypes.number.isRequired,
  };

  render() {
    const messages = this.props.messages;
    const left = "message--left";
    const right = "message--right";
    const sortedMessages = messages.sort(
      (a, b) => new Date(a.publicationDate) - new Date(b.publicationDate)
    );
    console.log("message", messages);
    return (
      <div className="chat__message-list">
        <ul className="message-list">
          {sortedMessages.map((message) => {
            return message.chatId == this.props.chatId ? (
              <li className={`message-list__item`} key={message.id}>
                <div
                  className={`${
                    message.userId == this.props.currentUserId ? left : right
                  }`}
                ></div>
                <Message content={message.content} />
              </li>
            ) : null;
          })}
        </ul>
      </div>
    );
  }
}

export default MessageList;