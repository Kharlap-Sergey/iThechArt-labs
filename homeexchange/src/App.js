import React from "react";
import { connect } from "react-redux";
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

import "./app.scss";
import NavBar from "./components/nav-bar/NavBar";
import CreateAd from "./pages/CreateAd";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./registration/Registration";
import Profile from "./pages/Profile";
import Ad from "./pages/Ad/Ad";
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/ad/create" component={CreateAd} />
            <Route exact path="/ad/:id" component={Ad} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/registration" component={Registration} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

const mapStateToPops = (state) => {
  return state.redirect;
};
export default connect(mapStateToPops, null)(App);
