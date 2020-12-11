import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class Message extends PureComponent {
  static propTypes = {
    content: PropTypes.string.isRequired,
  };

  render() {
    console.log("this.props", this.props);
    return <div className="message">{this.props.content}</div>;
  }
}
export default Message;
