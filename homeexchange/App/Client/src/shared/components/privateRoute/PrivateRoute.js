import { path } from "shared/utils/path";
import React from "react";
import { Redirect, withRouter } from "react-router-dom";

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (authed ? <Component {...rest} /> : <Redirect to={path.sign.login} />);
}

export default withRouter(PrivateRoute);
