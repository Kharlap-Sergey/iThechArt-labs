import { path } from "./../../utils/path";
import { Redirect, withRouter } from "react-router-dom";
function PrivateRoute({ component: Component, authed, ...rest }) {
  return authed == true ? <Component {...rest}/> : <Redirect to={path.sign} />;
}

export default withRouter(PrivateRoute);
