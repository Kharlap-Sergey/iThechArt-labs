import React, { Component } from "react";
import InputBox from "../components/input/InputBox";
import "./form.scss";

class Registration extends Component {
  constructor(props){
    super(props)

    this.state = {}
  }

  changeInputHandler = (event) => {
    event.persist();
    this.setState((prev) => {
      console.log(prev);

      return {
        ...prev,
        ...{
          [event.target.name]: event.target.value,
        },
      };
    });
  };

  render() {
    const inputsArguments = [
      { placeholder: "firstname", name: "firstname", },
      { placeholder: "lastname", name: "lastname" },
      { placeholder: "nickname", name: "nickname" },
      { placeholder: "e-mail", name: "e-mail" },
      { placeholder: "country", name: "country" },
      { placeholder: "city", name: "city" },
    ];

    return (
      <div>
        <form action="" className="form">
          <div className="form__body">
          {inputsArguments.map((inputArguments, index) => (
              <InputBox
                key={index}
                placeholder={inputArguments.placeholder}
                name={inputArguments.name}
                id={index}
                onChange={this.changeInputHandler}
              />
            ))}

            <button type="submit" className="submit">
              submit
            </button>

            <div className="form__text">
              <p>alreade have an account?</p>
              <a
                href="/login"
                className="form__link"
                data-item-content="login"
              >
                login
              </a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Registration;
