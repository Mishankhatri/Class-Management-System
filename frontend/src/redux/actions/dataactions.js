import axiosInstance from "../../axios";
import {
  DATA_LOADED,
  DATA_LOADING,
  FETCH_ERROR,
  GET_COUNT,
} from "../actiontypes/datatypes";
import { returnErrors } from "./alertactions";

export const getData = (data, page) => (dispatch) => {
  dispatch({ type: DATA_LOADING });
  if (page) {
    axiosInstance
      .get(`${data}/?page=${page}`)
      .then((res) => {
        dispatch({ type: DATA_LOADED, payload: { [data]: res.data } });
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({ type: FETCH_ERROR });
      });
  } else {
    axiosInstance
      .get(`${data}/`)
      .then((res) => {
        dispatch({ type: DATA_LOADED, payload: { [data]: res.data } });
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({ type: FETCH_ERROR });
      });
  }
};

export const getTotalCount = () => {
  return function (dispatch) {
    dispatch({ type: DATA_LOADING });
    axiosInstance
      .get(`count/`)
      .then((res) => {
        dispatch({ type: GET_COUNT, payload: res.data });
      })
      .catch((err) => {
        // dispatch(returnErrors(err.response.data, err.response.status));

        dispatch({ type: FETCH_ERROR });
      });
  };
};
