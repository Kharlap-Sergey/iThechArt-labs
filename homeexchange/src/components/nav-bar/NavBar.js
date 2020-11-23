import React from "react";
import "./NavBar.scss";
export default class NavBar extends React.Component {
  render() {
    return (
      <nav className="menu">
        <ul className="menu__Items">
          <li className="menu__item">
            <a
              href="/"
              className="menu__href"
              name="Home"
              data-item-content="Home"
            >
              Home
            </a>
          </li>
          <li className="menu__item">
            <a
              href="/registration"
              className="menu__href"
              name="Register"
              data-item-content="Register"
            >
              Register
            </a>
          </li>
          <li className="menu__item">
            <a
              href="/login"
              className="menu__href"
              name="login"
              data-item-content="log in"
            >
              log in
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
