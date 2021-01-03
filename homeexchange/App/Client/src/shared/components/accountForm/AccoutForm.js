import React, { PureComponent } from "react";
import InputBox from "../inputBox/InputBox";
import SubmitButton from "./components/submitButton/SubmitButton";
import "./account-form.scss";
class AccoutForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.initialState,
      shouldShow: false,
      validationTitle: {},
    };
    this.submiteHandler = this.submiteHandler.bind(this);
    this.changeInputHandler = this.changeInputHandler.bind(this);
  }

  submiteHandler(e) {
    this.setState({ shouldShow: false });
    e.preventDefault();

    setTimeout(() => this.props.onSubmit(this.state), 1000);
  }

  getValidationMessage(element) {
    const validity = element.target.validity;
    if (validity.patternMismatch) {
      return "please use only: " + element.target.dataset.permitions;
    }
    if (validity.valueMissing) {
      return "please fill out this field";
    }
    if (validity.tooShort) {
      return `this field require ${element.target.getAttribute(
        "minlength"
      )} characters or more`;
    }
    if (validity.typeMismatch) {
      return `his field require data to be ${element.target.getAttribute(
        "type"
      )}`;
    }
  }
  changeInputHandler(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    if (!e.target.validity.valid) {
      this.setState({
        validationTitle: {
          [e.target.name]: this.getValidationMessage(e),
        },
      });
    } else if (this.state.validationTitle[e.target.name]) {
      this.setState({
        validationTitle: {
          [e.target.name]: "",
        },
      });
    }
  }
  componentDidMount() {
    setTimeout(() => this.setState({ shouldShow: true }), 500);
  }

  handleSubmitClick(e) {
    e.preventDefault();
  }
  render() {
    return (
      <form action="" className="form" onSubmit={this.submiteHandler}>
        <div className="form__body">
          {this.props.header}

          {this.props.inputs.map((input, index) => {
            let formInput = (
              <div
                className={`form__input ${
                  !this.state.shouldShow ? "m0" : "opas-1"
                }`}
                key={input.name}
              >
                <InputBox
                  key={input.name}
                  placeholder={input.placeholder}
                  name={input.name}
                  val={this.state[input.name] ?? ""}
                  validationTitle={this.state.validationTitle[input.name]}
                  typ={input.type}
                  validationAttributes={input.validationAttributes}
                  onChange={this.changeInputHandler}
                />
              </div>
            );
            return formInput;
          })}

          <SubmitButton onClick={this.handleSubmitClick}></SubmitButton>

          {this.props.footer}
        </div>
      </form>
    );
  }
}

export default AccoutForm;
