import axiosInstance from "../../../axios";
import {
  GET_TEACHER_DETAIL,
  ADD_TEACHER_DETAIL,
} from "./../../actiontypes/teacher/teacherdatatype";

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

export const AddTeacherDetail = (data) => {
  return function (dispatch) {
    console.log(data);
    //   axiosInstance
    //     .post("teacher/", {
    //       TRN: data.teacherTRN,
    //       first_name: data.teacherFirstName,
    //       middle_name: data.teacherMiddleName,
    //       last_name: data.teacherLastName,
    //       DOB: data.teacherDOB,
    //       email: data.teacherEmail,
    //       address: data.teacherLocation,
    //       photo: data.teacherPhoto,
    //       contact_no: data.teacherPhone,
    //       gender: data.teacherGender.value,
    //       user_id: 1,
    //     })
    //     .then(() => {
    //       dispatch({
    //         type: ADD_TEACHER_DETAIL,
    //       });
    //     })
    //     .catch((error) => {
    //       if (error.response) {
    //         console.log("Response", error.response);
    //       } else if (error.request) {
    //         console.log("Request", error.request);
    //       } else console.log(error);
    //     });
  };
};
