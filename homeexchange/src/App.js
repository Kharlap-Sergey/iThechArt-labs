import React from "react";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import "./app.scss";
import { auth } from "./auth/auth";
import NavBar from "./components/nav-bar/NavBar";
import Account from "./pages/Account";
import Ads from "./pages/Ads";
import CreateAd from "./pages/CreateAd";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import { connect } from "react-redux";
function App() {

  return (
    <div className="App">
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/ads" component={Ads} />
            <Route exact path="/ad/create" component={CreateAd} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/registration" component={Registration} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

const mapStateToPops = (state) =>{
  return state.redirect;
}
export default connect(mapStateToPops, null)(App);
