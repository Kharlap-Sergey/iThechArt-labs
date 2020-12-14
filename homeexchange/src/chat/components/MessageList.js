import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Message from "./Message";
import AccountAvatar from "../../shared/components/accountAvatar/AccountAvatar";
class MessageList extends PureComponent {
  constructor(props) {
    super(props);
    this.chatListRef = React.createRef();
  }
  static propTypes = {
    messages: PropTypes.array.isRequired,
    chatId: PropTypes.number.isRequired,
    currentUserid: PropTypes.number.isRequired,
  };
  scrollDown() {
    var block = this.chatListRef.current;
    if (!block) return;
    block.scrollTop = block.scrollHeight;
  }
  componentDidMount() {
    this.scrollDown();
  }
  componentDidUpdate() {
    this.scrollDown();
  }
  render() {
    const messages = this.props.messages;
    const left = "message--left";
    const right = "message--right";
    const sortedMessages = messages.sort(
      (a, b) => new Date(a.publicationDate) - new Date(b.publicationDate)
    );

    console.log("message", messages);
    return (
      <div className="chat__message-list" ref={this.chatListRef}>
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
