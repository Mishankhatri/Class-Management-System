import axiosInstance, { axiosInstanceMultipart } from "../../../axios";

import { createMessage } from "./../alertactions";
import {
  GET_STUDENTCLASS_SID,
  DELETE_STUDENT,
  GET_STUDENT_USERID,
  UPDATE_STUDENT_PARENT_DETAIL,
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
      .then(() => {
        dispatch(
          createMessage({ deleteStudent: "Student Deleted Successfully" })
        );
      })
      .catch((error) => console.log(error));
  };
};

export const AddStudentDetail = (postData, url, type) => {
  return function (dispatch) {
    const body = postData;
    axiosInstanceMultipart
      .post(`${url}/`, body)
      .then(() => {
        dispatch({
          type: type,
        });
      })
      .then(() => {
        dispatch(createMessage({ studentAdd: "Student Added Successfuly" }));
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
      .then(() => {
        dispatch(createMessage({ addGenral: "Added Successfully" }));
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

export const ChangeStudentDetail = (url, id, type, postdata) => {
  return function (dispatch) {
    const body = postdata;
    axiosInstanceMultipart
      .put(`${url}/${id}/`, body)
      .then(() => {
        dispatch({ type: type });
        dispatch(StudentClassById(id));
      })
      .then(() => {
        dispatch(
          createMessage({ studentChange: "Student detail Changed Succesfully" })
        );
      })
      .catch((error) => {
        if (error.request) console.log(error.request);
        else if (error.response) console.log(error.response);
        else console.log(error);
      });
  };
};

export const ChangeStudentClassDetail = (url, id, type, postdata) => {
  return function (dispatch) {
    const body = postdata;
    axiosInstance
      .patch(`${url}/${id}/`, body)
      .then(() => {
        dispatch({ type: type });
        dispatch(
          GET_DETAILS("/parent", "GET_STUDENT_PARENTS_BYID", `student=${id}`)
        );
      })
      .then(() => {
        dispatch(
          createMessage({ studentChange: "Student detail Changed Succesfully" })
        );
      })
      .catch((error) => {
        if (error.request) console.log(error.request);
        else if (error.response) console.log(error.response);
        else console.log(error);
      });
  };
};

export const ChangeStudentParentDetail = (s_id, p_id, postdata) => {
  return function (dispatch) {
    const body = postdata;
    axiosInstanceMultipart
      .patch(`parent/${p_id}/`, body)
      .then(() => {
        dispatch({ type: UPDATE_STUDENT_PARENT_DETAIL });
        dispatch(
          GET_DETAILS("/parent", "GET_STUDENT_PARENTS_BYID", `student=${s_id}`)
        );
      })
      .then(() => {
        dispatch(
          createMessage({
            parentChange: "Student Parent Detail Changed Succesfully",
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
