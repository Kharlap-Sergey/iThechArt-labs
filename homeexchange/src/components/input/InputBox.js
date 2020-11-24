import React, { Component } from "react";
import "./inputBox.scss";
class InputBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      [props.name.toString()]: "",
    };
  }

  render() {
    console.log();
    return (
      <div className="form__input input-box">
        <input
          key={this.props.id}
          type="text"
          className="input-box__input"
          name={this.props.name.toString()}
          placeholder={this.props.placeholder.toString()}
          value={this.props.val[this.props.name] ?? ""}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default InputBox;
