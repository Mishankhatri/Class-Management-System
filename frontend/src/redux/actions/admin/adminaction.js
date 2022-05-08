import axiosInstance, { axiosInstanceMultipart } from "../../../axios";
import { createMessage, returnErrors } from "../alertactions";

import { getUser, logout } from "./../authactions";
import {
  ADD_TIMETABLES,
  CHANGE_ADMIN_PASSWORD,
  DELETE_TIMETABLES,
  GET_TABLE_DATA,
  GET_TIMETABLES,
  GET_TIMETABLES_ID,
  SAVE_QUERY_DATA,
  UPDATE_ADMIN_INFO,
  UPDATE_TIMETABLES,
  UPDATE_USER_IMAGE,
} from "./../../actiontypes/admin/admindatatype";
import { UPDATE_SUCCESS } from "../../actiontypes/authtypes";

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
    const body = data;
    axiosInstance
      .patch(`user/profile/update/`, body)
      .then(() => dispatch({ type: UPDATE_ADMIN_INFO }))
      .then(() => {
        dispatch({ type: UPDATE_SUCCESS });
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
    const body = data;
    axiosInstanceMultipart
      .patch("user/profile/update/", body)
      .then(() => {
        dispatch({ type: UPDATE_USER_IMAGE });
      })
      .then(() => {
        dispatch(
          createMessage({
            profileChange: "UserProfile Changed Successully",
          })
        );
        dispatch(getUser());
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
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
          });
  };
};

export const DeleteTimetables = (id, reverse = false) => {
  return function (dispatch) {
    axiosInstance
      .delete(`/timetable/${id}`)
      .then(() => {
        dispatch({ type: DELETE_TIMETABLES });
      })
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        dispatch(
          createMessage({
            deleteTimetables: "Selected Timetable Deleted  Successully",
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
        dispatch(GetAdminTimetables("ordering=-id"));
        dispatch(
          createMessage({
            addTimetables: "Timetables Added Successully",
          })
        );
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
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
      .put(`timetable/${id}/`, body)
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
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const SaveQueryData = (query) => {
  return function (dispatch) {
    dispatch({ type: SAVE_QUERY_DATA, payload: query });
  };
};

export const LoadDataTable = (url, query) => {
  return function (dispatch) {
    return axiosInstance(
      query.search != ""
        ? `${url}?page=${query.page + 1}&search=${query.search}`
        : `${url}?page=${query.page + 1}`
    ).then((response) => {
      const data = response.data;
      dispatch({ type: GET_TABLE_DATA, payload: data });
      return data;
    });
  };
};

export const LoadDataTableFilter = (url, query, filter) => {
  return function (dispatch) {
    return axiosInstance(
      query.search != ""
        ? `${url}?page=${query.page + 1}&search=${query.search}&${filter}`
        : `${url}?page=${query.page + 1}&${filter}`
    ).then((response) => {
      const data = response.data;
      dispatch({ type: GET_TABLE_DATA, payload: data });
      return data;
    });
  };
};
