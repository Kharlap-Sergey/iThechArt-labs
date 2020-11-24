import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";
export default class NavBar extends React.Component {
  render() {
    return (
      <nav className="menu">
        <ul className="menu__Items">
          <li className="menu__item" key="Home">
            <Link
              to="/"
              className="menu__href"
              name="Home"
              data-item-content="Home"
            >
              Home
            </Link>
          </li>
          <li className="menu__item" key="Register">
            <Link
              to="/registration"
              className="menu__href"
              name="Register"
              data-item-content="Register"
            >
              Register
            </Link>
          </li>
          <li className="menu__item" key="login">
            <Link
              to="/login"
              className="menu__href"
              name="login"
              data-item-content="log in"
            >
              log in
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
