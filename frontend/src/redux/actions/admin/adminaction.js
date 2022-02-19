import axiosInstance from "../../../axios";
import { createMessage, returnErrors } from "../alertactions";

import { logout } from "./../authactions";
import {
  ADD_TIMETABLES,
  CHANGE_ADMIN_PASSWORD,
  DELETE_TIMETABLES,
  GET_TIMETABLES,
  GET_TIMETABLES_ID,
  UPDATE_ADMIN_INFO,
  UPDATE_TIMETABLES,
} from "./../../actiontypes/admin/admindatatype";

export const ChangeAdminPassword = (data) => {
  return function (dispatch) {
    axiosInstance
      .put("user/changepassword/", {
        old_password: data.settingsCurrentPassword,
        password: data.settingsNewPassword,
        password2: data.settingsRePassword,
      })
      .then(() => dispatch({ type: CHANGE_ADMIN_PASSWORD }))
      .then(() => {
        dispatch(
          createMessage({
            successPasswordChange: "Password Changed Successully",
          })
        );
      })
      .then(() => {
        dispatch(logout());
      })
      .catch(({ response }) => {
        dispatch(returnErrors(response.data, response.status));
      });
  };
};

export const UpdateUserInfo = (data) => {
  return function (dispatch) {
    axiosInstance
      .patch("user/profile/update/", {
        username: data.username,
        email: data.email,
        fullname: data.fullname,
      })
      .then(() => dispatch({ type: UPDATE_ADMIN_INFO }))
      .then(() => {
        dispatch(
          createMessage({
            updateUserInfo: "User Info Changed Successully",
          })
        );
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        console.log(err.response);
      });
  };
};

export const ChangeUserImage = (data) => {
  return function (dispatch) {
    axiosInstance
      .put("user/profile/update/", {
        // username: data.username,
        // email: data.email,
        // fullname: data.fullname,
        // profile_image,
      })
      .then(() => {
        dispatch(
          createMessage({
            profileChange: "UserProfile Changed Successully",
          })
        );
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        console.log(err.response);
      });
  };
};

//Timetables

export const GetAdminTimetables = (filter) => {
  return function (dispatch) {
    filter
      ? axiosInstance
          .get(`/timetable?${filter}`)
          .then(({ data }) => {
            dispatch({ type: GET_TIMETABLES, payload: data.results });
          })
          .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
            console.log(err.response);
          })
      : axiosInstance
          .get("/timetable")
          .then(({ data }) => {
            dispatch({ type: GET_TIMETABLES, payload: data.results });
          })
          .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
            console.log(err.response);
          });
  };
};

export const DeleteTimetables = (id) => {
  return function (dispatch) {
    axiosInstance
      .delete(`/timetable/${id}`)
      .then(() => {
        dispatch({ type: DELETE_TIMETABLES });
        dispatch(GetAdminTimetables());
      })
      .then(() => {
        dispatch(
          createMessage({
            deleteTimetables: "Selected Timetable Deleted Changed Successully",
          })
        );
      })
      .catch((error) => console.log(error));
  };
};

export const AddTimetables = (postdata) => {
  return function (dispatch) {
    const body = postdata;
    axiosInstance
      .post(`timetable/`, body)
      .then(() => {
        dispatch({ type: ADD_TIMETABLES });
      })
      .then(() => {
        dispatch(
          createMessage({
            addTimetables: "Timetables Added Successully",
          })
        );
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        console.log(err.response);
      });
  };
};

export const GetAdminTimetablesByID = (id) => {
  return function (dispatch) {
    axiosInstance
      .get(`/timetable/${id}`)
      .then(({ data }) => {
        dispatch({ type: GET_TIMETABLES_ID, payload: data });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        console.log(err.response);
      });
  };
};

export const ChangeTimetableDetail = (id, postdata) => {
  return function (dispatch) {
    const body = postdata;
    axiosInstance
      .patch(`timetable/${id}/`, body)
      .then(() => {
        dispatch({ type: UPDATE_TIMETABLES });
        dispatch(GetAdminTimetablesByID(id));
      })
      .then(() => {
        dispatch(
          createMessage({
            changeTimetable: "Selected Timetable Changed Successully",
          })
        );
      })
      .catch((error) => {
        if (error.request) console.log(error.request);
        else if (error.response) console.log(error.response);
        else console.log(error);
      });
  };
};
