import React, { Component } from 'react';
import InputBox from '../input/InputBox';
import { connect } from "react-redux"
import {chengeRegFormInputAction} from "../../redux/actionsCreator"
import "./form.scss"

class AccountForm extends Component {
  constructor(props){
    console.log(props)
    super(props);

    this.state = {};
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
    this.props.chengeRegFormInputAction({
      [event.target.name]: event.target.value,
    })
  };

  submeted(event){
    console.log("form was submeted")
    event.preventDefault();
    //validate
    //отправляем данные на сервер
  }


  render() {
    return (
      <div>
        <form action="" className="form">
          <div className="form__body">
            {this.props.inputsArguments.map((inputArguments, index) => (
              <InputBox
                key={index}
                placeholder={inputArguments.placeholder}
                name={inputArguments.name}
                id={index}
                onChange={this.changeInputHandler}
                val={this.props.registrationForm}
              />
            ))}

            <button type="submit" className="submit" onClick={this.submeted}>
              submit
            </button>

            {this.props.formText}
          </div>
        </form>
      </div>
    );
  }
}


const mapStateToProps = state =>{
  console.log(state)
  return state
}

const mapDispatchProps = {
  chengeRegFormInputAction
}

export default connect(mapStateToProps, mapDispatchProps)(AccountForm);
