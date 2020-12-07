import React from "react";
import { connect } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

import "./app.scss";
import NavBar from "./nav-bar/NavBar";
import Home from "./home/Home";
import Login from "./login/Login";
import Registration from "./registration/Registration";
import Profile from "./profile/Profile";
import Ad from "./ad/Ad";
import RouteCatcher from "./shared/components/routeCatcher/RouteCatcher";
import EditProfile from "./editProfile/EditProfile";
import AdCreation from './adCreation/AdCreation';
import AdEditor from './adEditor/AdEditor';
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <NavBar />
          <div className="main">
            <Switch>
              <RouteCatcher>
                <Route exact path="/edit/profile/:id" component={EditProfile} />
                <Route exact path="/ad/id:id" component={Ad} />
                <Route exact path="/ad/create" component={AdCreation} />
                <Route exact path="/ad/edite/id:id" component={AdEditor} />
                <Route exact path="/profile/:id" component={Profile}/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registration" component={Registration} />
                <Route exact path="/" component={Home}/>
              </RouteCatcher>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

const mapStateToPops = (state) => {
  return state.redirect;
};
export default connect(mapStateToPops, null)(App);
