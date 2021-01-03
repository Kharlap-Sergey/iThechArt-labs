import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { redirectClear } from "../../redux/redirect/redirectActionCreator";
class RouteCatcher extends PureComponent {
  render() {
    if (this.props.path) {
      this.props.redirectClear();
      return <Redirect to={this.props.path} />;
    }
    return this.props.children;
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.redirect,
  };
};

const mapDispatchToProps = { redirectClear };
export default connect(mapStateToProps, mapDispatchToProps)(RouteCatcher);
