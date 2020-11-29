import React, { Component } from "react";
import { Link } from "react-router-dom";
import InputBox from "../components/input/InputBox";
import {loginUserPost} from "../redux/actionsCreator";
import "./form.scss";
import { connect } from "react-redux";
import {auth} from "../auth/auth";

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

  userLoginFetch = user => {
    console.log(user);
    let url = "https://localhost:44370/Account/Login";
    console.log(this.props);
    console.log(JSON.stringify(user));
    async function t() {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log(response);

      if (response.ok) {
        let data = await response.json();
        auth.setToken(data.jwt);

        this.props.loginUserAction({username: data.user.email, userId: data.user.id});
        console.log(data)
      } else {
        console.log("Status: ", response.status);
        let data = await response.json();
        alert(data.errorText)
      }
    }
    t.call(this);
  }
  
  submeteHandler = (event) => {
    console.log("form was submeted");
    event.preventDefault();

    let user = {
      login: this.state.email,
      password: this.state.password,
    };

    this.props.loginUserPost(user);
  };

  changeInputHandler = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
    // this.props.chengeFormInputAction({
    //   [event.target.name]: event.target.value,
    // });
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

const mapDispatchToProps = { loginUserPost };
export default connect(mapStateToProps, mapDispatchToProps)(Login);
