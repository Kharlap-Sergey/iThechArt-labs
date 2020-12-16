import React, { PureComponent } from "react";
import InputBox from "../inputBox/InputBox";
import SubmitButton from "./components/submitButton/SubmitButton";
import "./account-form.scss";
class AccoutForm extends PureComponent {
  // props = {submitHandler, inputs, footer, header}
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
    console.log("submit handler was occured", e);
    console.log("props", this.props);
    console.log("the form state is ", this.state);

    setTimeout(() => this.props.onSubmit(this.state), 1000);
  }

  getValidationMessage(element) {
    const validity = element.target.validity;
    if (element.target.validity.patternMismatch) {
      return "please use only: " + element.target.dataset.permitions;
    }
    if (element.target.validity.valueMissing) {
      return "please fill out this field";
    }
    if (element.target.validity.tooShort){
      return `this field require ${element.target.getAttribute("minlength")} characters or more`;
    }
    if (element.target.validity.typeMismatch){
      return `his field require data to be ${element.target.getAttribute("type")}`;
    }
  }
  changeInputHandler(e) {
    e.preventDefault();
    console.log("changes in input was occured", e.target);
    console.log("props", this.props);
    console.log("the form state was ", this.state);
    this.setState({ [e.target.name]: e.target.value });
    if (!e.target.validity.valid) {
      console.log(e.target.validity, e.target.pattern);
      this.setState({
        validationTitle: {
          [e.target.name]: this.getValidationMessage(e),
        },
      })
    } else if(this.state.validationTitle[e.target.name]){
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
  render() {
    console.log("this.props", this.props);
    console.log("this.props", this.state);
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

          <SubmitButton></SubmitButton>

          {this.props.footer}
        </div>
      </form>
    );
  }
}

export default AccoutForm;
