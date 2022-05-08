import {
  DELETE_ATTENDANCE,
  GET_STUDENT_ATTENDANCE,
  GET_STUDENT_ATTENDANCE_FILTER,
} from "../actiontypes/student/studentdatatype";
import axiosInstance from "./../../axios";
import { returnErrors, createMessage } from "./alertactions";
import {
  ADD_SUBJECT,
  DELETE_SUBJECTS,
  UPDATE_SUBJECT_DETAIL,
  VIEW_SUBJECTS,
  VIEW_SUBJECTS_ID,
} from "./../actiontypes/subjecttypes";

export const ViewSubjects = () => {
  return function (dispatch) {
    axiosInstance.get("/subjects").then(({ data: { results } }) => {
      dispatch({ type: VIEW_SUBJECTS, payload: results });
    });
  };
};

export const ViewSubjectsFilter = (filter) => {
  return function (dispatch) {
    axiosInstance.get(`/subjects/${filter}`).then(({ data }) => {
      dispatch({ type: VIEW_SUBJECTS_ID, payload: data });
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
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        dispatch(
          createMessage({
            deleteSubject: "Selected Subjects Deleted Successully",
          })
        );
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

export const ViewStudentAttendanceByFilter = (filter) => {
  return function (dispatch) {
    axiosInstance.get(`/attendance?${filter}`).then(({ data: { results } }) => {
      dispatch({ type: GET_STUDENT_ATTENDANCE_FILTER, payload: results });
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
      .then(() => {
        dispatch(
          createMessage({
            deleteAttendance: "Selected Attendance Deleted Successully",
          })
        );
      })
      .catch((error) => console.log(error));
  };
};

export const ADD__SUBJECTS = (postData, msg) => {
  const body = postData;
  return function (dispatch) {
    axiosInstance
      .post(`subjects/`, body)
      .then(() => {
        dispatch({
          type: ADD_SUBJECT,
        });
      })
      .then(() => {
        dispatch(
          createMessage({
            addSubject: msg,
          })
        );
      })
      .catch((error) => {
        dispatch(returnErrors(error.response.data, error.response.status));
      });
  };
};

export const ChangeSubjectDetail = (id, postdata) => {
  return function (dispatch) {
    const body = postdata;
    axiosInstance
      .put(`subjects/${id}/`, body)
      .then(() => {
        dispatch({ type: UPDATE_SUBJECT_DETAIL });
        dispatch(ViewSubjectsFilter(id));
      })
      .then(() => {
        dispatch(
          createMessage({
            changeSubject: "Selected Subjected Changed Successfully",
          })
        );
      })
      .catch((error) => {
        if (error.request) console.log(error.request);
        else if (error.response) console.log(error.response);
        else console.log(error);
      });
  };
};
