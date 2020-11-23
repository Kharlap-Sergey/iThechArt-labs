import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./app.scss";
import NavBar from "./components/nav-bar/NavBar";
import Account from "./pages/Account";
import Ads from "./pages/Ads";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/ads" component={Ads} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/registration" component={Registration} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
