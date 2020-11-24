import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { rootReducer } from "./redux/rootReducer";
import { Provider } from "react-redux";
import { compose, createStore } from "redux";
import { chengeRegFormInputAction, chengeLogFormInputAction } from "./redux/actionsCreator";
const store = createStore(
  rootReducer,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// store.dispatch(chengeRegFormInputAction ({c:"reg"} ));
// надстройка для нашего <App с целью передачи нашего store

const app = (
  <Provider store={store}>
    <App />
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
