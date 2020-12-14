import React, { PureComponent } from "react";
import InputBox from "../inputBox/InputBox";
import SubmitButton from "./components/submitButton/SubmitButton";
import "./account-form.scss";
class AccoutForm extends PureComponent {
  // props = {submitHandler, inputs, footer, header}
  constructor(props) {
    super(props);
    this.state = this.props.initialState ?? {};

    this.submiteHandler = this.submiteHandler.bind(this);
    this.changeInputHandler = this.changeInputHandler.bind(this);
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
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    console.log('this.props', this.props)
    return (
      <form action="" className="form" onSubmit={this.submiteHandler}>
        <div className="form__body">
          {this.props.header}

          {this.props.inputs.map((input, index) => (
            <div className="form__input" key={input.name}>
              <InputBox
                key={input.name}
                placeholder={input.placeholder}
                name={input.name}
                val={this.state[input.name] ?? ""}
                typ={input.type}
                validationAttributes={input.validationAttributes}
                //метод который будет вызываться при каждом изменнении input
                onChange={this.changeInputHandler}
              />
            </div>
          ))}

          <SubmitButton></SubmitButton>

          {this.props.footer}
        </div>
      </form>
    );
  }
}

export default AccoutForm;
