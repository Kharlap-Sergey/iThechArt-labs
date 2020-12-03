import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewAd } from "../shared/redux/ad/adActionCreator";

class CreateAd extends Component {
  state = {type: "tenancy"};
  submeteHandler = (event) => {
    console.log("form was submeted");
    event.preventDefault();
    console.log(this.props);
    let ad = {
      ...this.state,
    };
    ad.type = this.state.type == "tenancy" ? 1 : 2;
    this.props.createNewAd(ad);
  };

  changeInputHandler = (event) => {
    event.persist();
    console.log({ [event.target.name]: event.target.value });
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.submeteHandler}>
          <div className="form-group">
            <label>title</label>
            <input
              className="form-control"
              name="title"
              onChange={this.changeInputHandler}
            />
          </div>
          <div className="form-group">
            <label>type</label>
            <select
              className="form-control"
              name="type"
              onChange={this.changeInputHandler}
            >
              <option value="tenancy">tenancy</option>
              <option value="toRent">toRent</option>
            </select>
          </div>
          <div className="form-group">
            <label>description</label>
            <input
              className="form-control"
              name="description"
              onChange={this.changeInputHandler}
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
  createNewAd,
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateAd);
