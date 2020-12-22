import React from "react";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import "./app.scss";
import NavBar from "./nav-bar/NavBar";
import Home from "./home/Home";
import Profile from "./profile/Profile";
import Ad from "./ad/Ad";
import RouteCatcher from "./shared/components/routeCatcher/RouteCatcher";
import EditProfile from "./editProfile/EditProfile";
import AdCreation from "./adCreation/AdCreation";
import AdEditor from "./adEditor/AdEditor";
import { path } from "./shared/utils/path";
import Chat from "./chat/Chat";
import Sign from "./sign/Sign";
import Chats from "./chats/Chats";
import SearchBar from "./shared/components/searchBar/SearchBar";
import PrivateRoute from "./shared/components/privateRoute/PrivateRoute";
function App() {
  const user = useSelector((state) => state.user);
  const auth = new Boolean(user.userId);
  return (
    <div className="app">
      <Router>
        <NavBar />
        <div className="main">
          <Switch>
            <RouteCatcher>
              <Route exact path={"/test"} component={SearchBar} />
              <Route exact path={path.profile.edit()}>
                <PrivateRoute authed={auth}>
                  <EditProfile />
                </PrivateRoute>
              </Route>
              <Route exact path={path.chat()}>
                <PrivateRoute authed={auth}>
                  <Chat />
                </PrivateRoute>
              </Route>
              <Route exact path="/ad/create">
                <PrivateRoute authed={auth}>
                  <AdCreation />
                </PrivateRoute>
              </Route>
              <Route exact path="/ad/edite/id:id">
                <PrivateRoute authed={auth}>
                  <AdEditor />
                </PrivateRoute>
              </Route>
              <Route exact path={path.ad()} component={Ad} />
              <Route exact path="/profile/:id" component={Profile} />
              <Route exact path={path.sign} component={Sign} />
              <Route exact path={path.home} component={Home} />
            </RouteCatcher>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
