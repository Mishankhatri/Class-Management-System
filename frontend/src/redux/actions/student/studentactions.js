import axiosInstance from "../../../axios";

import {
  GET_STUDENTCLASS_SID,
  DELETE_STUDENT,
  GET_STUDENT_DETAIL,
} from "../../actiontypes/student/studentdatatype";

export const GET_DETAILS = (url, type) => {
  return function (dispatch) {
    axiosInstance
      .get(url)
      .then(({ data: { results } }) => {
        dispatch({
          type: type,
          payload: results,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const StudentClassById = (id) => {
  return function (dispatch) {
    axiosInstance
      .get(`/student/${id}`)
      .then(({ data }) => {
        dispatch({
          type: GET_STUDENTCLASS_SID,
          payload: data,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const StudentDelete = (id) => {
  return function (dispatch) {
    axiosInstance
      .delete(`/student/${id}`)
      .then(({ data }) => {
        console.log("deleted");
        dispatch({ type: DELETE_STUDENT });
        dispatch(GET_DETAILS("/student", "GET_STUDENT_DETAIL"));
      })
      .catch((error) => console.log(error));
  };
};
