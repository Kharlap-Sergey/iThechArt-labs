import React from "react";
import "./input-box.scss";
class InputBox extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <div className="input-box">
        <input
          key={this.props.id}
          type={this.props.type}
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
