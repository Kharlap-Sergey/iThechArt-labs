import React from "react";
import "./input-box.scss";
class InputBox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.show_hide_password = this.show_hide_password.bind(this);
    this.handleFocuse = this.handleFocuse.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.state = { showValidation: true };
    this.refToInput = React.createRef();
  }

  show_hide_password(event) {
    event.preventDefault();
    var input = this.refToInput.current;
    if (input.getAttribute("type") === "password") {
      event.target.classList.add("view");
      input.setAttribute("type", "text");
    } else {
      event.target.classList.remove("view");
      input.setAttribute("type", "password");
    }
    return false;
  }

  onChange(event) {
    this.props.onChange(event);
  }

  handleFocuse(event) {
    this.props.onChange(event);
  }
  handleBlur(event) {
    this.props.onChange(event);
    this.setState({ showValidation: true });
  }
  render() {
    return (
      <div className="input-box">
        <div className="input-box__validation">
          {this.state.showValidation && this.props.validationTitle
            ? this.props.validationTitle
            : null}
        </div>
        <input
          onFocus={this.handleFocuse}
          onBlur={this.handleBlur}
          ref={this.refToInput}
          className="input-box__input"
          type={this.props.typ ?? "text"}
          name={this.props.name.toString()}
          placeholder={this.props.placeholder.toString()}
          value={this.props.val ?? ""}
          onChange={this.onChange}
          {...this.props.validationAttributes}
        />
        {this.props.name === "password" && (
          <a
            href="#"
            className="password-control"
            onClick={this.show_hide_password}
          />
        )}
      </div>
    );
  }
}

export default InputBox;
