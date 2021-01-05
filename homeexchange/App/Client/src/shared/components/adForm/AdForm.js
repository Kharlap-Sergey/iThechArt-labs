import React, { PureComponent } from "react";
import "./ad-form.scss";
import SubmitButton from "../submitButton/SubmitButton";
class AdForm extends PureComponent {
  constructor(props) {
    super(props);

    this.submiteHandler = this.submiteHandler.bind(this);
    this.changeInputHandler = this.changeInputHandler.bind(this);
    const temp = this.props.initial ?? { type: 1 };
    this.state = { validationTitle: {}, ...temp };
    this.handleFocuse = this.handleFocuse.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  submiteHandler(e) {
    e.preventDefault();

    this.props.onSubmit(this.state);
  }

  changeInputHandler(e) {
    e.preventDefault();

    if (e.target.name === "type") {
      this.setState({ [e.target.name]: Number(e.target.value) });
    } else this.setState({ [e.target.name]: e.target.value });

    if (!e.target.validity.valid) {
      this.setState({
        validationTitle: {
          [e.target.name]: this.getValidationMessage(e.target),
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

  getValidationMessage(element) {
    const validity = element.validity;
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

  handleFocuse(event) {
    this.changeInputHandler(event);
  }
  handleBlur(event) {
    this.changeInputHandler(event);
    this.setState({ showValidation: true });
  }

  render() {
    return (
      <form action="" className="ad-form" onSubmit={this.submiteHandler}>
        <div className="ad-form__body">
          <div className="ad-form__title">
            <div className="ad-form__title-validation">
              {this.state.validationTitle.title
                ? this.state.validationTitle.title
                : null}
            </div>
            <input
              onFocus={this.handleFocuse}
              onBlur={this.handleBlur}
              className="ad-form__title-input"
              autoComplete="off"
              key="title"
              placeholder="title"
              name="title"
              required
              maxLength="30"
              value={this.state.title}
              onChange={this.changeInputHandler}
            />
          </div>
          <div className="ad-form__type">
            <select
              className="form-control"
              name="type"
              value={this.state.type}
              onChange={this.changeInputHandler}
            >
              <option value={1}>to lease</option>
              <option value={2}>to rent</option>
            </select>
          </div>
          <div className="ad-form__description">
            <div className="input-box__validation">
              {this.state.validationTitle.description
                ? this.state.validationTitle.description
                : null}
            </div>
            <textarea
              onBlur={this.handleBlur}
              onFocus={this.handleFocuse}
              key="description"
              placeholder="add some information about your ad"
              type="text"
              maxLength="1000"
              required
              name="description"
              value={this.state.description}
              onChange={this.changeInputHandler}
            ></textarea>
          </div>
          <SubmitButton />
        </div>
      </form>
    );
  }
}

export default AdForm;
