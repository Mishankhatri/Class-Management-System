import axiosInstance from "../../../axios";

import { GET_STUDENTCLASS_SID } from "../../actiontypes/student/studentdatatype";

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
