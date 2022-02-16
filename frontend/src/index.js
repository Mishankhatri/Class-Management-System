import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import "./components/adminpanel/pages/users/UserProfile.css";
import "./components/adminpanel/pages/student/CustomView.css";

import "./components/common/css/Announcement.css";
import "./components/common/css/CustomConfirm.css";
import { getUser } from "./redux/actions/authactions";
//Alert options
const alertOptions = {
  timeout: 2000,
  position: "top center",
  containerStyle: {
    zIndex: 99999,
  },
};
const token = localStorage.getItem("access_token");
if (token) {
  store.dispatch(getUser());
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Alert />
        <Routes>
          <Route path="/*" element={<PrivateRoute navigate="/login" />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/logout"} element={<Logout />} />
          <Route path={"/register/admin/"} element={<Register />} />
        </Routes>
      </AlertProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
