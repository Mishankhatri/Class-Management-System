import axiosInstance, { axiosInstanceMultipart } from "../../../axios";

import { createMessage, returnErrors } from "./../alertactions";
import {
  GET_STUDENTCLASS_SID,
  DELETE_STUDENT,
  GET_STUDENT_USERID,
  UPDATE_STUDENT_PARENT_DETAIL,
  SUBMIT_ASSIGNMENTS,
  CHANGE_SUBMIT_ASSIGNMENTS,
  GET_STUDENT_ASSIGNMENT_FILTER,
  STUDENT_DATA_LOADING,
  ADD_STUDENT_PARENT_DETAIL,
} from "../../actiontypes/student/studentdatatype";

export const GET_DETAILS = (url, type, filter) => {
  return function (dispatch) {
    dispatch({ type: STUDENT_DATA_LOADING });
    filter
      ? axiosInstance
          .get(`${url}/?${filter}`)
          .then(({ data }) => {
            dispatch({
              type: type,
              payload: data,
            });
          })
          .catch((err) => {
            if (typeof err.response === "undefined") {
              console.log(err);
            } else {
              dispatch(returnErrors(err.response.data, err.response.status));
            }
          })
      : axiosInstance
          .get(url)
          .then(({ data }) => {
            dispatch({
              type: type,
              payload: data,
            });
          })
          .catch((err) => {
            if (typeof err.response === "undefined") {
              console.log(err);
            } else {
              dispatch(returnErrors(err.response.data, err.response.status));
            }
          });
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
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
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
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const StudentDelete = (id, url, query) => {
  return function (dispatch) {
    axiosInstance
      .delete(`/student/${id}`)
      .then(() => {
        dispatch({ type: DELETE_STUDENT });
        // dispatch(GET_DETAILS("/student", "GET_STUDENT_DETAIL"));
      })
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        dispatch(
          createMessage({ deleteStudent: "Student Deleted Successfully" })
        );
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
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
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
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
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const ChangeStudentDetail = (url, id, type, postdata) => {
  return function (dispatch) {
    const body = postdata;
    axiosInstanceMultipart
      .patch(`${url}/${id}/`, body)
      .then(() => {
        dispatch({ type: type });
        dispatch(StudentClassById(id));
      })
      .then(() => {
        dispatch(
          createMessage({ studentChange: "Student detail Changed Succesfully" })
        );
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
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
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const AddStudentParentDetail = (s_id, postdata) => {
  return function (dispatch) {
    const body = postdata;
    axiosInstance
      .post(`parent/`, body)
      .then(() => {
        dispatch({ type: ADD_STUDENT_PARENT_DETAIL });
        dispatch(
          GET_DETAILS("/parent", "GET_STUDENT_PARENTS_BYID", `student=${s_id}`)
        );
      })
      .then(() => {
        dispatch(
          createMessage({
            DetailsAdded: "Parents Details Added Succesfully",
          })
        );
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const ChangeStudentParentDetail = (s_id, p_id, postdata) => {
  return function (dispatch) {
    const body = postdata;
    axiosInstance
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
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const AddStudentSubmitAssignment = (postData, user, id) => {
  return function (dispatch) {
    const body = postData;
    axiosInstance
      .post(`submittedassignments/`, body)
      .then(() => {
        dispatch({
          type: SUBMIT_ASSIGNMENTS,
        });
      })
      .then(() => {
        dispatch(
          createMessage({ addAssignment: "Assignment Uploaded Successfully" })
        );
        dispatch(
          GetSubmittedAssignmentFilter(`student=${user.id}&assignment=${id}`)
        );
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const ChangeSubmittedAssignment = (postData, id, userId, assId) => {
  return function (dispatch) {
    const body = postData;
    axiosInstance
      .patch(`submittedassignments/${id}/`, body)
      .then(() => {
        dispatch({
          type: CHANGE_SUBMIT_ASSIGNMENTS,
        });
      })
      .then(() => {
        dispatch(
          createMessage({
            addAssignment: "Assignment File Re-Submitted Successfully",
          })
        );
        dispatch(
          GetSubmittedAssignmentFilter(`student=${userId}&assignment=${assId}`)
        );
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const GetSubmittedAssignmentFilter = (filter) => {
  return function (dispatch) {
    axiosInstance
      .get(`/submittedassignments?${filter}`)
      .then(({ data }) => {
        dispatch({
          type: GET_STUDENT_ASSIGNMENT_FILTER,
          payload: data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};
