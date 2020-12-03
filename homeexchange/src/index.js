import React from "react";
import thunk from "redux-thunk"
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ReduxToastr from 'react-redux-toastr'

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { rootReducer } from "./shared/redux/rootReducer";
import { applyMiddleware, compose, createStore } from "redux";
import { loginUserAction } from "./redux/loginActionsCreator";
import { auth } from "./auth/auth";
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunk
      ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// store.dispatch(chengeRegFormInputAction ({c:"reg"} ));
// надстройка для нашего <App с целью передачи нашего store
let jwt = auth.getToken();
let setUserName = (token, url) => {
  if (!token) {
    return "";
  }

  async function setNameAsync() {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token, // передача токена в заголовке
      },
    });

    if (response.ok === true) {
      const data = await response.json();
      store.dispatch(loginUserAction({username:data}));
    } else {
      console.log("Status: ", response.status);
      console.log(response);

    }
  }

  setNameAsync();
};
//setUserName(jwt, "https://localhost:44370/Login/GetLogin"); - обновление логина при обновлениии страницы


const app = (
  <Provider store={store}>
    <App />
    <ReduxToastr
      timeOut={5000}
      newestOnTop={false}
      preventDuplicates
      position="top-center"
      getState={(state) => state.toastr} // This is the default
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick/>
  </Provider>
);


ReactDOM.render(
  <React.StrictMode>{app}</React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
