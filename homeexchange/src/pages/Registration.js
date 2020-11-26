// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import InputBox from "../components/input/InputBox";
// import {chengeFormInputAction} from "../redux/actionsCreator"
// import "./form.scss"
// import { connect } from "react-redux";

// class Registration extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {};
//   }

//   inputsArguments = [
//     { placeholder: "firstname", name: "firstname" },
//     { placeholder: "lastname", name: "lastname" },
//     { placeholder: "nickname", name: "nickname" },
//     { placeholder: "e-mail", name: "e-mail" },
//     { placeholder: "country", name: "country" },
//     { placeholder: "city", name: "city" },
//   ];


//   formText = (
//     <div className="form__text">
//       <p>alreade have an account?</p>
//       <Link to="/login" className="form__link" data-item-content="login">
//         login
//       </Link>
//     </div>
//   );

//   submete(event) {
//     console.log("form was submeted");
//     event.preventDefault();
//     //validate
//     //отправляем данные на сервер
//   }

//   changeInputHandler = (event) => {
//     event.persist();
//     this.props.chengeFormInputAction({
//       [event.target.name]: event.target.value,
//     });
//   };

//   render() {
//     return (
//       <div>
//         <form action="" className="form">
//           <div className="form__body">
//             {this.inputsArguments.map((inputArguments, index) => (
//               <InputBox
//                 key={index}
//                 placeholder={inputArguments.placeholder}
//                 name={inputArguments.name}
//                 id={index}
//                 onChange={this.changeInputHandler}
//                 val={this.props}
//               />
//             ))}

//             <button type="submit" className="submit" onClick={this.submeted}>
//               submit
//             </button>

//             {this.formText}
//           </div>
//         </form>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   console.log(state);
//   return state.accountForm;
// };

// const mapDispatchToProps = { chengeFormInputAction };
// export default connect(mapStateToProps, mapDispatchToProps)(Registration);
