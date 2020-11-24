import React, { Component } from "react";
import InputBox from "../input/InputBox";
import { connect } from "react-redux";
import { chengeFormInputAction } from "../../redux/actionsCreator";
import "./form.scss";

class AccountForm extends Component {
  constructor(props) {
    console.log(props);
    super(props);
  }

  changeInputHandler = (event) => {
    event.persist();
    this.props.chengeFormInputAction({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    debugger;

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
                val={this.props}
              />
            ))}

            <button
              type="submit"
              className="submit"
              onClick={this.props.submeted}
            >
              submit
            </button>

            {this.props.formText}
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

const mapDispatchToProps = { chengeFormInputAction };
// const mapDispatchToProps = dispatch => {
//   return {
//     // dispatching plain actions
//     chengeFormInputAction: (va) => dispatch(chengeFormInputAction(va)),
//   }
// }

export default connect(mapStateToProps, mapDispatchToProps)(AccountForm);
