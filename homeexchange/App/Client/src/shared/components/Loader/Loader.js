import React, { Component } from "react";
import "./loader.scss";
class Loader extends Component {
  render() {
    return (
      <div id="cube-loader">
        <div className="caption">
          <div className="cube-loader">
            <div className="cube loader-1"></div>
            <div className="cube loader-2"></div>
            <div className="cube loader-4"></div>
            <div className="cube loader-3"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Loader;
