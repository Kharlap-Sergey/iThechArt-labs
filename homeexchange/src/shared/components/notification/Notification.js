import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class Notification extends PureComponent {
  render() {
    return <div>{this.props.notification.id}</div>;
  }
}

Notification.propTypes = {
  notification: PropTypes.object.isRequire,
};
export default connect(null, null)(Notification);
