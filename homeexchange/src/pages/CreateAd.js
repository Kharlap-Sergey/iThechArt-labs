import React, { Component } from "react";
import { connect } from "react-redux";

class CreateAd extends Component {
  state = {}
  userCreateFetch = ad => {
    let url = "https://localhost:44370/Ad/Create";
    async function t() {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
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
    this.userCreateFetch(ad);
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
              name="text"
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
export default connect(mapStateToProps, null)(CreateAd);
