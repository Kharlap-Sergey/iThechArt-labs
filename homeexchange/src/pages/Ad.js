import React, { Component } from "react";

class Ad extends Component {

  componentDidMount(){
    let url = window.location.href;
    let parts = url.split("/")
    let id = parts[parts.length-1];
    console.log(url);
    console.log(id);
  }

  render() {
    let ad;
    return (
      <div>
        страница
        <div></div>
        <div></div>
      </div>
    );
  }
}

export default Ad;
