import React from "react";
import "./submit-button.scss";

class SubmitButton extends React.PureComponent {
  render() {
    return (
      <button type="submit" className="submit" onClick={this.props.onClick3}>
        submit
      </button>
    );
  }
}

export default SubmitButton;
