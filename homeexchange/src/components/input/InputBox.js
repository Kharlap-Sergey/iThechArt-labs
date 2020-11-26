import React from "react";
import "./inputBox.scss";
class InputBox extends React.Component {
  constructor(props) {
    super(props);
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
          value={this.props.val?? ""}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default InputBox;
