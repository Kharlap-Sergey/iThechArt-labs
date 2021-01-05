import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Message from "../message/Message";
import AccountAvatar from "shared/components/accountAvatar/AccountAvatar";
import "./message-list.scss";

class MessageList extends PureComponent {
  constructor(props) {
    super(props);
    this.chatListRef = React.createRef();
  }
  static propTypes = {
    messages: PropTypes.array.isRequired,
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
    const left = "chat-message--left";
    const right = "chat-message--right";
    const sortedMessages = messages.sort(
      (a, b) => new Date(a.publicationDate) - new Date(b.publicationDate)
    );

    const srotedMessagesList = sortedMessages.map((message, index) => {
      return (
        <React.Fragment key={message.id}>
          {message.userId !== this.props.currentUserId &&
          sortedMessages?.[index - 1]?.userId !== message.userId ? (
            <div className="avatar--mini">
              <AccountAvatar profileId={message.userId} />
            </div>
          ) : null}
          <li className={`message-list__item`} key={message.id}>
            <div
              className={`${
                message.userId === this.props.currentUserId ? left : right
              }`}
            ></div>
            <Message content={message.content} />
          </li>
        </React.Fragment>
      );
    });
    return (
      <div className="message-box__message-list" ref={this.chatListRef}>
        <ul className="message-list">{srotedMessagesList}</ul>
      </div>
    );
  }
}

export default MessageList;
