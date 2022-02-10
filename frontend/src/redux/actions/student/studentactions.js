import axiosInstance from "../../../axios";
import {
  GET_STUDENT_DETAIL,
  UPDATE_STUDENT_DETAIL,
  GET_STUDENT_CLASS,
  GET_STUDENTCLASS_SID,
} from "../../actiontypes/student/studentdatatype";

export const StudentDetail = () => {
  return function (dispatch) {
    axiosInstance
      .get("/student")
      .then(({ data: { results } }) => {
        dispatch({
          type: GET_STUDENT_DETAIL,
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

export const CLassList = () => {
  return function (dispatch) {
    axiosInstance
      .get(`/grades`)
      .then(({ data: { results } }) => {
        dispatch({
          type: GET_STUDENT_CLASS,
          payload: results,
        });
      })
      .catch((error) => console.log(error));
  };
};
