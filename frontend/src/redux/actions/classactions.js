import { ADD_CLASS, GET_CLASS } from "../actiontypes/classtype";
import axiosInstance from "./../../axios";
import { DELETE_CLASSSEC } from "./../actiontypes/classtype";

export const AddClassActions = (data) => {
  return function (dispatch) {
    axiosInstance
      .post("grades/", { class_name: data.className })
      .then(() => {
        dispatch({
          type: ADD_CLASS,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const GetClass = () => {
  return function (dispatch) {
    axiosInstance.get("/grades").then(({ data: { results } }) => {
      dispatch({ type: GET_CLASS, payload: results });
    });
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
