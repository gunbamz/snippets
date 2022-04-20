import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import './index.css';
//import { PersistGate } from 'redux-persist/integration/react';
//import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
  );
  // </PersistGate>
  // <PersistGate loading={null} persistor={persistor}>
