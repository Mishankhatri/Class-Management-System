import {
  ADD_CLASS,
  FILTER_CLASS,
  GET_CLASS,
  DELETE_CLASSSEC,
} from "../actiontypes/classtype";
import axiosInstance from "./../../axios";
import { returnErrors } from "./alertactions";

export const AddClassActions = (data) => {
  return function (dispatch) {
    axiosInstance
      .post("grades/", { class_name: data })
      .then(() => {
        dispatch({
          type: ADD_CLASS,
        });
      })
      .catch((error) => {
        dispatch(returnErrors(error.response.data, error.response.status));
      });
  };
};

export const GetClass = () => {
  return function (dispatch) {
    axiosInstance.get("/grades").then(({ data: { results } }) => {
      dispatch({ type: GET_CLASS, payload: results });
    });
  };
};

export const FilterClass = (filter, data) => {
  return function (dispatch) {
    axiosInstance
      .get(`/grades?${filter}=${data}`)
      .then(({ data }) => {
        dispatch({ type: FILTER_CLASS, payload: data });
      })
      .catch((error) => {
        dispatch(returnErrors(error.response.data, error.response.status));
      });
  };
};

export const GetClassPaginated = (page, pageSize) => {
  const offset = page * pageSize;
  return function (dispatch) {
    axiosInstance.get(`/grades?page=${page}`);
  };
};

export const DeleteClassSec = (id) => {
  return function (dispatch) {
    axiosInstance
      .delete(`/grades/${id}`)
      .then(() => {
        dispatch({ type: DELETE_CLASSSEC });
        dispatch(GetClass());
      })
      .catch((error) => console.log(error));
  };
};
