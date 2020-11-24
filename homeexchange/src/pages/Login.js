import React, { Component } from "react";
import InputBox from "../components/input/InputBox";
import "./form.scss";

class Login extends Component {
  render() {
    const inputsArguments = [
      { placeholder: "nickname", name: "nickname" },
      { placeholder: "password", name: "password" },
    ];
    return (
      <div>
        <form action="" className="form">
          <div className="form__body">
            {inputsArguments.map((inputArguments, index) => (
              <InputBox
                placeholder={inputArguments.placeholder}
                name={inputArguments.name}
                id={index}
              />
            ))}

            <button type="submit" className="submit">
              submit
            </button>

            <div className="form__text">
              <p>or</p>
              <a
                href="/registration"
                className="form__link"
                data-item-content="registrate"
              >
                registrate 
              </a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
