import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { selectRedirectPath } from "shared/redux/redirect/selectors";
import { redirectClear } from "shared/redux/redirect/actions";

class RouteCatcher extends PureComponent {
  render() {
    if (this.props.path) {
      this.props.redirectClear();
      return <Redirect to={this.props.path} />;
    }
    return this.props.children;
  }
}
const mapStateToProps = (state) => ({path: selectRedirectPath(state)})

const mapDispatchToProps = { redirectClear };
export default connect(mapStateToProps, mapDispatchToProps)(RouteCatcher);
