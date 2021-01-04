import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { path } from "shared/utils/path";
import "./message.scss";

class Message extends PureComponent {
  static propTypes = {
    content: PropTypes.string.isRequired,
  };

  renderMessage(content) {
    let pat = /@(.+)@/;
    if (!pat.test(content)) return content;
    let res = pat.exec(content);
    return (
      <>
        {content.slice(0, res.index)}
        <Link to={path.ad.to(res[1])}>{res[0]}</Link>
      </>
    );
  }
  render() {
    return (
      <div className="chat-message">
        {this.renderMessage(this.props.content)}
      </div>
    );
  }
}
export default Message;
