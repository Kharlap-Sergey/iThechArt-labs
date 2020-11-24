import React, { Component } from "react";
import "./inputBox.scss";
class InputBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      [props.name.toString()]: "",
    };
  }

  // changeInputHandler = (event) => {
  //   event.persist();
  //   this.setState((prev) => {
  //     console.log(prev);

  //     return {
  //       ...prev,
  //       ...{
  //         [event.target.name]: event.target.value,
  //       },
  //     };
  //   });
  // };

  render() {
    return (
      <div className="form__input input-box">
        <input
          key={this.props.id}
          type="text"
          className="input-box__input"
          name={this.props.name.toString()}
          placeholder={this.props.placeholder.toString()}
          value={this.state.value}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default InputBox;
