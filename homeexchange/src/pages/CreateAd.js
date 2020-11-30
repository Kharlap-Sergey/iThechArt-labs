import React, { Component } from "react";
import { connect } from "react-redux";
import {auth} from "../auth/auth";
import {createNewAd} from "../redux/adActionCreator";

class CreateAd extends Component {
  state = {}
  userCreateFetch = ad => {
    let url = "https://localhost:44370/Ad/Create";
    let token = auth.getToken();
    async function t() {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(ad),
      });
      console.log(response);

      if (response.ok) {
        let data = await response.json();    
        console.log(data)
      } else {
        console.log("Status: ", response.status);
        let data = await response.json();
        alert(data.errorText)
      }
    }
    t.call(this);
  }
  
  submeteHandler = (event) => {
    console.log("form was submeted");
    event.preventDefault();
    console.log(this.props);
    let ad = {
      ...this.state,
    };
    ad.authorId = this.props.userId;
    this.props.createNewAd(ad);
  };

  changeInputHandler = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });

  };
  render() {
    return (
      <div>
        <form onSubmit={this.submeteHandler}>
          <div className="form-group" >
            <label >title</label>
            <input
              className="form-control"
              name="title"
              onChange = {this.changeInputHandler}
            />
          </div>
          <div className="form-group">
            <label >text</label>
            <input
              className="form-control"
              name="descr"
              onChange = {this.changeInputHandler}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return state.accountForm;
};
const mapDispatchToProps = {
  createNewAd
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateAd);
