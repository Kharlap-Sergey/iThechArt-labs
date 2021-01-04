import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Message from "./Message";
import AccountAvatar from "../../../../shared/components/accountAvatar/AccountAvatar";
class MessageList extends PureComponent {
  constructor(props) {
    super(props);
    this.chatListRef = React.createRef();
  }
  static propTypes = {
    messages: PropTypes.array.isRequired,
    chatId: PropTypes.number.isRequired,
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

    return (
      <div className="message-box__message-list" ref={this.chatListRef}>
        {/* {sortedMessages.length < 1 ? (
          <div className="message-box__nothing">type first message</div>
        ) : null} */}
        <ul className="message-list">
          {sortedMessages.map((message, index) => {
            return message.chatId == this.props.chatId ? (
              <React.Fragment key={message.id}>
                {message.userId != this.props.currentUserId &&
                sortedMessages?.[index - 1]?.userId != message.userId ? (
                  <div className="avatar--mini">
                    <AccountAvatar profileId={message.userId} />
                  </div>
                ) : null}
                <li className={`message-list__item`} key={message.id}>
                  <div
                    className={`${
                      message.userId == this.props.currentUserId ? left : right
                    }`}
                  ></div>
                  <Message content={message.content} />
                </li>
              </React.Fragment>
            ) : null;
          })}
        </ul>
      </div>
    );
  }
}

export default MessageList;