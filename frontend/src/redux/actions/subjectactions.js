import { ADD_SUBJECT } from "../actiontypes/classtype";
import {
  DELETE_ATTENDANCE,
  GET_STUDENT_ATTENDANCE,
} from "../actiontypes/student/studentdatatype";
import axiosInstance from "./../../axios";
import { DELETE_SUBJECTS, VIEW_SUBJECTS } from "./../actiontypes/subjecttypes";

const AddSubject = (data, grades) => {
  const classID = grades.find(
    (value) =>
      value.class_name == data.subjectsClassName.value &&
      value.section == data.subjectsSection.value
  );

  return function (dispatch) {
    axiosInstance
      .post("subjects/", {
        subject_name: data.subjectsName,
        subject_code: data.subjectsCode,
        description: data.subjectsDescription,
        grade: classID,
      })
      .then(() => {
        dispatch({
          type: ADD_SUBJECT,
        });
      })
      .catch((error) => console.log(error.response));
  };
};

export default AddSubject;

export const ViewSubjects = () => {
  return function (dispatch) {
    axiosInstance.get("/subjects").then(({ data: { results } }) => {
      dispatch({ type: VIEW_SUBJECTS, payload: results });
    });
  };
};

export const SubjectDelete = (id) => {
  return function (dispatch) {
    axiosInstance
      .delete(`/subjects/${id}`)
      .then(() => {
        dispatch({ type: DELETE_SUBJECTS });
        dispatch(ViewSubjects());
      })
      .catch((error) => console.log(error));
  };
};

export const ViewStudentAttendance = (username) => {
  return function (dispatch) {
    axiosInstance
      .get(`/attendance?teachers=${username}`)
      .then(({ data: { results } }) => {
        dispatch({ type: GET_STUDENT_ATTENDANCE, payload: results });
      });
  };
};

export const DeleteAttendance = (id) => {
  return function (dispatch) {
    axiosInstance
      .delete(`/attendance/${id}`)
      .then(() => {
        dispatch({ type: DELETE_ATTENDANCE });
        dispatch(ViewStudentAttendance());
      })
      .catch((error) => console.log(error));
  };
};
