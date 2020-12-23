import { path } from "./../../utils/path";
import { Redirect } from "react-router-dom";
function PrivateRoute({ children, authed }) {
  return authed == true ? children : <Redirect to={path.sign} />;
}

export default PrivateRoute;
