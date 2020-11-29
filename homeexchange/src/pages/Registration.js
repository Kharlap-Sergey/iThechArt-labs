import React, { Component } from "react";
import { Link } from "react-router-dom";
import InputBox from "../components/input/InputBox";
import "./form.scss";
import { connect } from "react-redux";
import {registrateUserPost} from "../redux/registrationActionCreater"
class Registration extends Component {
  inputsArguments = [
    { placeholder: "firstname", name: "firstname" },
    { placeholder: "lastname", name: "lastname" },
    { placeholder: "nickname", name: "nickname" },
    { placeholder: "e-mail", name: "email" },
    { placeholder: "country", name: "country" },
    { placeholder: "city", name: "city" },
    { placeholder: "password", name: "password" },
  ];


  formText = (
    <div className="form__text">
      <p>alreade have an account?</p>
      <Link to="/login" className="form__link" data-item-content="login">
        login
      </Link>
    </div>
  );
  state = {};

  submeteHandler = (event) => {
    console.log("form was submeted");
    event.preventDefault();

    
    let user = {
      ...this.state
    };
    //validate

    console.log(user)
    this.props.registrateUserPost(user);
  };

  changeInputHandler = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
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
  return state.accountForm;
};

const mapDispatchToProps = {registrateUserPost};
export default connect(mapStateToProps, mapDispatchToProps)(Registration);
