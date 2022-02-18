import {
  DELETE_ATTENDANCE,
  GET_STUDENT_ATTENDANCE,
  GET_STUDENT_ATTENDANCE_FILTER,
} from "../actiontypes/student/studentdatatype";
import axiosInstance from "./../../axios";
import { returnSuccess, returnErrors } from "./alertactions";
import {
  ADD_SUBJECT,
  DELETE_SUBJECTS,
  VIEW_SUBJECTS,
} from "./../actiontypes/subjecttypes";

export const ViewSubjects = () => {
  return function (dispatch) {
    axiosInstance.get("/subjects").then(({ data: { results } }) => {
      dispatch({ type: VIEW_SUBJECTS, payload: results });
    });
  };
};

export const SubjectDelete = (id) => {
  return function (dispatch) {
    axiosInstance
      .delete(`/subjects/${id}`)
      .then(() => {
        dispatch({ type: DELETE_SUBJECTS });
        dispatch(ViewSubjects());
      })
      .catch((error) => console.log(error));
  };
};

export const ViewStudentAttendance = (username) => {
  return function (dispatch) {
    axiosInstance
      .get(`/attendance?teachers=${username}`)
      .then(({ data: { results } }) => {
        dispatch({ type: GET_STUDENT_ATTENDANCE, payload: results });
      });
  };
};

export const ViewStudentAttendanceByFilter = (filter) => {
  return function (dispatch) {
    axiosInstance.get(`/attendance?${filter}`).then(({ data: { results } }) => {
      dispatch({ type: GET_STUDENT_ATTENDANCE_FILTER, payload: results });
    });
  };
};

export const DeleteAttendance = (id) => {
  return function (dispatch) {
    axiosInstance
      .delete(`/attendance/${id}`)
      .then(() => {
        dispatch({ type: DELETE_ATTENDANCE });
        dispatch(ViewStudentAttendance());
      })
      .catch((error) => console.log(error));
  };
};

export const ADD__SUBJECTS = (postData) => {
  const body = postData;
  return function (dispatch) {
    axiosInstance
      .post(`subjects/`, body)
      .then(() => {
        dispatch({
          type: ADD_SUBJECT,
        });
        alert("Inserted");
      })
      .catch((error) => {
        dispatch(returnErrors(error.response.data, error.response.status));
      });
  };
};
