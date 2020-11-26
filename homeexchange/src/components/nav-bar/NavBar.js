import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./NavBar.scss";

class NavBar extends React.Component {
  render() {
    let accauntAction = () => {
      console.log(this.props.username);
      if ( this.props && this.props.username) {
        return (<p>{this.props.username}</p>);
      }
      return (
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
      );
      
    }
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
          {accauntAction()}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return state.accountForm;
};
export default connect(mapStateToProps, null)(NavBar);
