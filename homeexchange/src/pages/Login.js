import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import InputBox from "../components/input/InputBox";
import { loginUserPost } from "../redux/loginActionsCreator";
import {redirectClear} from "../redux/redirectActionCreator"
import "./form.scss";
import { connect } from "react-redux";

class Login extends Component {
  state = {};
  formText = (
    <div className="form__text">
      <p>or</p>
      <Link
        to="/registration"
        className="form__link"
        data-item-content="registrate"
      >
        registrate
      </Link>
    </div>
  );

  inputsArguments = [
    { placeholder: "e-mail", name: "email" },
    { placeholder: "password", name: "password" },
  ];

  submeteHandler = (event) => {
    console.log("form was submeted");
    event.preventDefault();

    //Todo validation

    let user = {
      login: this.state.email,
      password: this.state.password,
    };

    this.props.loginUserPost(user);
  };

  changeInputHandler = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    if (this.props.path) {
      this.props.redirectClear();
      return <Redirect to={this.props.path} />;
    }
    return (
      <div>
        <form action="" className="form" onSubmit={this.submeteHandler}>
          <div className="form__body">
            {this.inputsArguments.map((inputArguments, index) => (
              <InputBox
                key={index}
                //передаем placeholder для input
                placeholder={inputArguments.placeholder}
                //передаем имя
                name={inputArguments.name}
                //метод который будет вызываться при каждом изменнении input
                onChange={this.changeInputHandler}
                //значение
                val={this.state[inputArguments.name]}
              />
            ))}

            <button type="submit" className="submit">
              submit
            </button>

            {this.formText}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {...state.accountForm, ...state.redirect};
};

const mapDispatchToProps = { loginUserPost, redirectClear };
export default connect(mapStateToProps, mapDispatchToProps)(Login);
