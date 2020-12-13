import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { path } from "../../shared/utils/path";

class Message extends PureComponent {
  static propTypes = {
    content: PropTypes.string.isRequired,
  };

  renderMessage(content){
    let pat = /@(.+)@/;
    if(! pat.test(content)) return content
    let res = pat.exec(content);
    console.log('pat', pat)
    console.log('res', res)
    
    //content = String.prototype.
    return (
      <>
      {content.slice(0, res.index)}
      <Link to={path.ad(res[1])}>{res[0]}</Link>
      </>
    )
  }
  render() {
    console.log("this.props", this.props);
  return <div className="message">{this.renderMessage(this.props.content)}</div>;
  }
}
export default Message;
