import React from "react";
import thunk from "redux-thunk";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import "./index.css";
import './reset.scss';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { rootReducer } from "./shared/redux/rootReducer";
import { applyMiddleware, compose, createStore } from "redux";
//import { routerMiddleware } from 'react-router-redux'
//const middleware = routerMiddleware(browserHistory)
export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const toastr = (
  <ReduxToastr
    timeOut={5000}
    newestOnTop={false}
    preventDuplicates
    position="top-left"
    getState={(state) => state.toastr} // This is the default
    transitionIn="fadeIn"
    transitionOut="fadeOut"
    progressBar
    closeOnToastrClick
  />
);
const app = (
  <Provider store={store}>
    <App />
    {toastr}
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
