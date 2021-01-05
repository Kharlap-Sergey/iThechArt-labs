import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import NavBar from "nav-bar/NavBar";
import Home from "home/Home";
import Profile from "profile/Profile";
import Ad from "ad/Ad";
import ProfileEditor from "profileEditor/profileEditor";
import AdCreator from "adCreator/AdCreator";
import AdEditor from "adEditor/AdEditor";
import Sign from "sign/Sign";
import Chats from "chats/Chats";
import { path } from "shared/utils/path";
import RouteCatcher from "shared/components/routeCatcher/RouteCatcher";
import PrivateRoute from "shared/components/privateRoute/PrivateRoute";
import { selectUser } from "shared/redux/account/selectors";
import "./app.scss";
import { reenter } from "shared/redux/account/thunkActions";

function App() {
  const user = useSelector((state) => selectUser(state));
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(reenter());
    return () => {
    }
  }, []);

  const auth = !!user.userId;
  return (
    <div className="app">
      <Router>
        <NavBar />
        <div className="main">
          <Switch>
            <RouteCatcher>
              <Route exact path={path.profile.edit()}>
                <PrivateRoute authed={auth} component={ProfileEditor} />
              </Route>
              <Route exact path={path.chat()}>
                <PrivateRoute authed={auth} component={Chats} />
              </Route>
              <Route exact path={path.ad.create()}>
                <PrivateRoute authed={auth} component={AdCreator} />
              </Route>
              <Route exact path={path.ad.edit()}>
                <PrivateRoute authed={auth} component={AdEditor} />
              </Route>
              <Route exact path={path.ad.to()} component={Ad} />
              <Route exact path={path.profile.to()} component={Profile} />
              <Route exact path={path.sign.to} component={Sign} />
              <Route exact path={path.home} component={Home} />
            </RouteCatcher>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
