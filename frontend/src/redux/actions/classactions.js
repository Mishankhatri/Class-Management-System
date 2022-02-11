import { ADD_CLASS, GET_CLASS } from "../actiontypes/classtype";
import axiosInstance from "./../../axios";

export const AddClassActions = (data) => {
  return function (dispatch) {
    axiosInstance
      .post("grades/", { class_name: data.className })
      .then(() => {
        dispatch({
          type: ADD_CLASS,
        });
        // dispatch()
      })
      .catch((error) => console.log(error));
  };
};

export const GetClass = () => {
  return function (dispatch) {
    axiosInstance.get("/grades").then(({ data }) => {
      console.log(data);
      dispatch({ type: GET_CLASS, payload: data });
    });
  };
};
