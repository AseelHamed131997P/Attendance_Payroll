import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UIProvider } from "./ui";
import reportWebVitals from "./reportWebVitals";
import { createBrowserHistory } from "history";
import { ConnectedRouter } from "connected-react-router";

const history = createBrowserHistory();


ReactDOM.render(
  <React.StrictMode>
    <UIProvider>
    {/* <ConnectedRouter history={history}> */}
      <App />
      {/* </ConnectedRouter> */}
    </UIProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
