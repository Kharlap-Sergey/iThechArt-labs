import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Message from "./Message";

class MessageList extends PureComponent {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    messages: PropTypes.array.isRequired,
    //currentUserid: PropTypes.number.isRequired,
  };

  render() {
    const messages = this.props.messages;
    console.log('message', messages);
    return (
      <div>
        <ul>
          {messages.map((message) => {
            return (
              <li key={message.id}>
                <Message content={message.content} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default MessageList;
