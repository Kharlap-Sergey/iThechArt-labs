import React, { PureComponent } from "react";
import "./ad-form.scss";
import SubmitButton from "./../accountForm/components/submitButton/SubmitButton";
import InputBox from "./../inputBox/InputBox";
class AdForm extends PureComponent {
  constructor(props) {
    super(props);

    this.submiteHandler = this.submiteHandler.bind(this);
    this.changeInputHandler = this.changeInputHandler.bind(this);
    this.state = this.props.initial ?? { type: 1 };
  }

  submiteHandler(e) {
    e.preventDefault();
    console.log("submit handler was occured", e);
    console.log("props", this.props);
    console.log("the form state is ", this.state);
    this.props.onSubmit(this.state);
  }

  changeInputHandler(e) {
    e.preventDefault();
    console.log("changes in input was occured", e);
    console.log("props", this.props);
    console.log("the form state was ", this.state);
    if (e.target.name == "type") {
      console.log(Number(e.target.value));
      this.setState({ [e.target.name]: Number(e.target.value) });
    } else this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    console.log("render");
    console.log(this.props);
    return (
      <form action="" className="ad-form" onSubmit={this.submiteHandler}>
        <div className="ad-form__body">
          <div className="ad-form__title">
            <input
              className="ad-form__title-input"
              autoComplete="off"
              key="type"
              placeholder="title"
              name="title"
              required
              maxLength="30"
              value={this.state.title}
              onChange={this.changeInputHandler}
            />
          </div>
          <div className="ad-form__type">
            <select
              className="form-control"
              name="type"
              value={this.state.type}
              onChange={this.changeInputHandler}
            >
              <option value={1}>tenancy</option>
              <option value={2}>toRent</option>
            </select>
          </div>
          <div className="ad-form__description">
            <textarea
              key="description"
              placeholder="add some information about your ad"
              type="text"
              maxLength="1000"
              required
              name="description"
              value={this.state.description}
              onChange={this.changeInputHandler}
            ></textarea>
          </div>
          <SubmitButton />
        </div>
      </form>
    );
  }
}

export default AdForm;
