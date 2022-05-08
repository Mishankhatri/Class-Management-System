import axiosInstance from "../../axios";
import { axiosInstanceMultipart } from "../../axios";
import { createMessage, returnErrors } from "./alertactions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  // UPDATE_SUCCESS,
} from "../actiontypes/authtypes";

export const login =
  ({ email, password }) =>
  (dispatch) => {
    const body = JSON.stringify({ email, password });
    axiosInstance
      .post(`token/`, body)
      .then((res) => {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        dispatch(getUser());
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({ type: LOGIN_FAILED });
      });
  };

export const getUser = () => (dispatch) => {
  dispatch({ type: USER_LOADING });
  axiosInstance
    .get(`user/profile/`)
    .then((res) => {
      dispatch({ type: USER_LOADED, payload: res.data });
      axiosInstance.defaults.headers["Authorization"] =
        "JWT " + localStorage.getItem("access_token");
    })
    .catch((err) => {
      if (typeof err.response === "undefined") {
        dispatch({ type: USER_LOADING });
        console.log(err);
      } else {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({ type: USER_LOADING });
      }
    });
};

// export const updateProfile =
//   ({ username, email, fullname }) =>
//   (dispatch) => {
//     const body = JSON.stringify({ username, email, fullname });
//     axiosInstance
//       .patch(`profile/update/`, body)
//       .then((res) => {
//         dispatch({ type: UPDATE_SUCCESS, payload: res.data });
//         axiosInstance.defaults.headers["Authorization"] =
//           "JWT " + localStorage.getItem("access_token");
//       })
//       .catch((err) => {
//         dispatch(returnErrors(err.response.data, err.response.status));
//         dispatch({ type: AUTH_ERR });
//       });
//   };

// export const changePassword
// export const resetPassword

export const registeradmin = (postData) => (dispatch) => {
  const body = postData;

  axiosInstanceMultipart
    .post(`user/register/admin/`, body)
    .then((res) => {
      dispatch({ type: REGISTER_SUCCESS });
      dispatch(
        createMessage({ accountCreate: "Account Created Successfully" })
      );
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: REGISTER_FAILED });
    });
};

// export const registerteacher =
//   ({ email, username, fullname, password }) =>
//   (dispatch) => {
//     const body = JSON.stringify({ email, username, fullname, password });
//     axiosInstance
//       .post(`user/register/teacher/`, body)
//       .then((res) => {
//         dispatch({ type: REGISTER_SUCCESS, payload: res.data });
//       })
//       .catch((err) => {
//         dispatch(returnErrors(err.response.data, err.response.status));
//         dispatch({ type: REGISTER_FAILED });
//       });
//   };

// export const registerstudent =
//   ({ email, username, fullname, password }) =>
//   (dispatch) => {
//     const body = JSON.stringify({ email, username, fullname, password });
//     axiosInstance
//       .post(`user/register/student/`, body)
//       .then((res) => {
//         dispatch({ type: REGISTER_SUCCESS, payload: res.data });
//       })
//       .catch((err) => {
//         dispatch(returnErrors(err.response.data, err.response.status));
//         dispatch({ type: REGISTER_FAILED });
//       });
//   };

export const logout = () => (dispatch) => {
  axiosInstance
    .post("user/logout/blacklist/", {
      refresh_token: localStorage.getItem("refresh_token"),
    })
    .then((res) => {
      dispatch({ type: LOGOUT_SUCCESS });
    })
    .then(() => {
      dispatch({ type: "ON_LOGOUT_RESET" });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response, err.response.status));
    });
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  axiosInstance.defaults.headers["Authorization"] = null;
};
