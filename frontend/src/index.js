import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./forms/Login";
import Logout from "./forms/Logout";
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
import "./components/common/css/PasswordToggle.css";
import { getUser } from "./redux/actions/authactions";
import ForgetPassword from "./ForgetPassword";
import SetPassword from "./SetPassword";

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
          {/* <Route path={"/register/admin/"} element={<Register />} /> */}
          <Route path={"/forgetpassword"} element={<ForgetPassword />} />
          <Route
            path={"/setpassword/:uidb64/:token/"}
            element={<SetPassword />}
          />
        </Routes>
      </AlertProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
