import axiosInstance from "../../../axios";
import { GET_TEACHER_DETAIL } from "./../../actiontypes/teacher/teacherdatatype";

export const TeacherDetail = () => {
  return function (dispatch) {
    axiosInstance
      .get(`/teacher`)
      .then(({ data: { results } }) => {
        dispatch({
          type: GET_TEACHER_DETAIL,
          payload: results,
        });
      })
      .catch((error) => console.log(error));
  };
};
