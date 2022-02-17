import axiosInstance, { axiosInstanceMultipart } from "../../../axios";

import {
  GET_STUDENTCLASS_SID,
  DELETE_STUDENT,
  GET_STUDENT_USERID,
} from "../../actiontypes/student/studentdatatype";

export const GET_DETAILS = (url, type, filter) => {
  return function (dispatch) {
    filter
      ? axiosInstance
          .get(`${url}/?${filter}`)
          .then(({ data }) => {
            dispatch({
              type: type,
              payload: data,
            });
          })
          .catch((error) => console.log(error))
      : axiosInstance
          .get(url)
          .then(({ data }) => {
            dispatch({
              type: type,
              payload: data,
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

export const StudentByUserId = (id) => {
  return function (dispatch) {
    axiosInstance
      .get(`/student?user=${id}`)
      .then(({ data }) => {
        dispatch({
          type: GET_STUDENT_USERID,
          payload: data.results,
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

export const AddStudentDetail = (postData, url, type) => {
  return function (dispatch) {
    console.log(postData);
    const body = postData;
    axiosInstanceMultipart
      .post(`${url}/`, body)
      .then(() => {
        dispatch({
          type: type,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log("Response", error.response);
        } else if (error.request) {
          console.log("Request", error.request);
        } else console.log(error);
      });
  };
};

export const AddGeneralDetails = (postData, url, type) => {
  return function (dispatch) {
    const body = postData;
    axiosInstance
      .post(`${url}/`, body)
      .then(() => {
        dispatch({
          type: type,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log("Response", error.response);
        } else if (error.request) {
          console.log("Request", error.request);
        } else console.log(error);
      });
  };
};
