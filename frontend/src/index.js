import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./forms/Login";
import Logout from "./forms/Logout";
import Register from "./forms/Register";
import "./forms/Table.css";
import PrivateRoute from "./components/common/PrivateRoute";
import store from "./redux/store";
import { Provider } from "react-redux";
import Alert from "./components/common/Alert";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

//Alert options
const alertOptions = {
  // timeout: 8000,
  position: "top center",
};

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Alert />
        <Routes>
          <Route
            path="/*"
            element={<PrivateRoute navigate="/login" component={App} />}
          />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/logout"} element={<Logout />} />
          <Route path={"/register/admin/"} element={<Register />} />
        </Routes>
      </AlertProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
