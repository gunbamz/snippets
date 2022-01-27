import React from "react";
import ReactDOM from "react-dom";
import Appc from "./Appc";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Appc />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
