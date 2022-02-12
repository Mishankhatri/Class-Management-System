import axiosInstance from "../../../axios";
import {
  GET_TEACHER_DETAIL,
  ADD_TEACHER_DETAIL,
  GET_TEACHER_BYID,
  DELETE_TEACHER_DETAIL,
  GET_LECTURE_NOTES,
  DELETE_LECTURE_NOTES,
  DELETE_TEACHER_GIVEN_ASSIGNMENT,
  GET_TEACHER_GIVEN_ASSIGNMENT,
  GET_TEACHER_ASSIGNMENT_BYID,
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

export const TeacherById = (id) => {
  return function (dispatch) {
    axiosInstance
      .get(`/teacher/${id}`)
      .then(({ data }) => {
        dispatch({
          type: GET_TEACHER_BYID,
          payload: data,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const AddTeacherDetail = (data) => {
  return function (dispatch) {
    console.log(data);
    axiosInstance
      .post("teacher/", {
        TRN: data.teacherTRN,
        first_name: data.teacherFirstName,
        middle_name: data.teacherMiddleName,
        last_name: data.teacherLastName,
        DOB: data.teacherDOB,
        email: data.teacherEmail,
        address: data.teacherLocation,
        photo: data.teacherPhoto?.name,
        contact_no: data.teacherPhone,
        gender: data.teacherGender.value,
      })
      .then(() => {
        dispatch({
          type: ADD_TEACHER_DETAIL,
        });
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

export const TeacherDelete = (id) => {
  return function (dispatch) {
    axiosInstance
      .delete(`/teacher/${id}`)
      .then(() => {
        console.log("deleted");
        dispatch({ type: DELETE_TEACHER_DETAIL });
        dispatch(TeacherDetail());
      })
      .catch((error) => console.log(error));
  };
};

//Lecture Notes
export const GetLectureNotes = () => {
  return function (dispatch) {
    axiosInstance
      .get(`/lecturenotes`)
      .then(({ data: { results } }) => {
        dispatch({
          type: GET_LECTURE_NOTES,
          payload: results,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const DeleteLectureNotes = (id) => {
  return function (dispatch) {
    axiosInstance
      .delete(`/lecturenotes/${id}`)
      .then(() => {
        dispatch({ type: DELETE_LECTURE_NOTES });
        dispatch(GetLectureNotes());
      })
      .catch((error) => console.log(error));
  };
};

//Assignment
export const GetTeacherGivenAssignment = () => {
  return function (dispatch) {
    axiosInstance
      .get(`/givenassignments`)
      .then(({ data: { results } }) => {
        dispatch({
          type: GET_TEACHER_GIVEN_ASSIGNMENT,
          payload: results,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const DeleteTeacherGivenAssignment = (id) => {
  return function (dispatch) {
    axiosInstance
      .delete(`/givenassignments/${id}`)
      .then(() => {
        dispatch({ type: DELETE_TEACHER_GIVEN_ASSIGNMENT });
        dispatch(GetTeacherGivenAssignment());
      })
      .catch((error) => console.log(error));
  };
};

export const AssignmentGivenById = (id) => {
  return function (dispatch) {
    axiosInstance
      .get(`/givenassignments/${id}`)
      .then(({ data }) => {
        dispatch({
          type: GET_TEACHER_ASSIGNMENT_BYID,
          payload: data,
        });
      })
      .catch((error) => console.log(error));
  };
};
