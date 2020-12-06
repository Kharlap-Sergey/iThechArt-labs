import React from "react";
import "./input-box.scss";
class InputBox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.show_hide_password = this.show_hide_password.bind(this);

    this.refToInput = React.createRef();
  }

  show_hide_password(event) {
    event.preventDefault();
    console.log(event);
    var input = this.refToInput.current;
    if (input.getAttribute('type') === 'password') {
      event.target.classList.add("view");
      input.setAttribute('type', 'text');
    } else {
      event.target.classList.remove("view")
      input.setAttribute('type', 'password');
    }
    return false;
  }

  onChange(event) {
    console.log(event);
    this.props.onChange(event);
  }

  render() {
    console.log("render");
    console.log(this.props);
    return (
      <div className="input-box">
        <input
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
          ></a>
        )}
      </div>
    );
  }
}

export default InputBox;
