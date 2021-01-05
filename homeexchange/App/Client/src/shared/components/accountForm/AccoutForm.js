import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import InputBox from "shared/components/inputBox/InputBox";
import SubmitButton from "shared/components/submitButton/SubmitButton";
import { getValidationMessage } from "shared/utils/inputValidator";
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

  static propTypes = {
    header: PropTypes.object,
    footer: PropTypes.object,
    inputs: PropTypes.arrayOf(PropTypes.object),
  };

  componentDidMount() {
    setTimeout(() => this.setState({ shouldShow: true }), 500);
  }

  submiteHandler(e) {
    this.setState({ shouldShow: false });
    e.preventDefault();

    setTimeout(() => this.props.onSubmit(this.state), 1000);
  }

  changeInputHandler(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    if (!e.target.validity.valid) {
      this.setState({
        validationTitle: {
          [e.target.name]: getValidationMessage(e),
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

  render() {
    const inputsList = this.props.inputs.map((input, index) => {
      let formInput = (
        <div
          className={`form__input ${!this.state.shouldShow ? "m0" : "opas-1"}`}
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
    });
    return (
      <form action="" className="form" onSubmit={this.submiteHandler}>
        <div className="form__body">
          {this.props.header}
            
          {inputsList}

          <SubmitButton />

          {this.props.footer}
        </div>
      </form>
    );
  }
}

export default AccoutForm;
