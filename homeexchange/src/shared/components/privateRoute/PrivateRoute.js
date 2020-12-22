import { path } from "./../../utils/path";
import { Route, Redirect } from "react-router-dom";
function PrivateRoute({ children, authed }) {
  console.log('children', children)
  return authed == true ? children : <Redirect to={path.sign} />;
}

export default PrivateRoute;
