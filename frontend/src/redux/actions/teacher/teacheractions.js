import axiosInstance from "../../../axios";
import { axiosInstanceMultipart } from "../../../axios";
import { GET_DETAILS } from "../student/studentactions";
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
  GET_SUBMITTED_ASSIGNMENT,
  GET_TEACHER_ANNOUNCEMENT,
  DELETE_TEACHER_ANNOUNCEMENT,
  ASSIGN_TEACHER_SUBJECTS,
} from "./../../actiontypes/teacher/teacherdatatype";

export const TeacherDetail = () => {
  return function (dispatch) {
    axiosInstance
      .get(`/teacher`)
      .then(({ data }) => {
        dispatch({
          type: GET_TEACHER_DETAIL,
          payload: data,
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

export const AddTeacherDetail = (postData) => {
  return function (dispatch) {
    console.log(postData);
    const body = postData;
    axiosInstanceMultipart
      .post("teacher/", body)
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

export const AssignTeacherSubjects = (postData) => {
  return function (dispatch) {
    console.log(postData);
    const body = postData;
    axiosInstance
      .post("AssignTeacherToSubjectsAPI/", body)
      .then(() => {
        dispatch({
          type: ASSIGN_TEACHER_SUBJECTS,
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
export const GetLectureNotes = (id) => {
  return function (dispatch) {
    id
      ? axiosInstance
          .get(`/lecturenotes?ordering=-id&teacher=${id}`)
          .then(({ data: { results } }) => {
            dispatch({
              type: GET_LECTURE_NOTES,
              payload: results,
            });
          })
          .catch((error) => console.log(error))
      : axiosInstance
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
export const GetTeacherGivenAssignment = (username) => {
  return function (dispatch) {
    axiosInstance
      .get(`/givenassignments?teachers=${username}`)
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

//Student Submitted Assignment
export const GetStudentSubmittedAssignment = () => {
  return function (dispatch) {
    axiosInstance
      .get(`/submittedassignments`)
      .then(({ data: { results } }) => {
        dispatch({
          type: GET_SUBMITTED_ASSIGNMENT,
          payload: results,
        });
      })
      .catch((error) => console.log(error));
  };
};

//Announcement
export const GetTeacherAnnouncement = (username) => {
  return function (dispatch) {
    username
      ? axiosInstance
          .get(`/teachernotices?teacher=${username}`)
          .then(({ data: { results } }) => {
            dispatch({
              type: GET_TEACHER_ANNOUNCEMENT,
              payload: results,
            });
          })
          .catch((error) => console.log(error))
      : axiosInstance
          .get(`/teachernotices`)
          .then(({ data: { results } }) => {
            dispatch({
              type: GET_TEACHER_ANNOUNCEMENT,
              payload: results,
            });
          })
          .catch((error) => console.log(error));
  };
};

export const DeleteTeacherAnnouncements = (id) => {
  return function (dispatch) {
    axiosInstance
      .delete(`/teachernotices/${id}`)
      .then(() => {
        dispatch({ type: DELETE_TEACHER_ANNOUNCEMENT });
        dispatch(GetTeacherAnnouncement());
      })
      .catch((error) => console.log(error));
  };
};

export const ChangeTeacherDetail = (id, type, postdata) => {
  return function (dispatch) {
    const body = postdata;
    axiosInstanceMultipart
      .patch(`teacher/${id}/`, body)
      .then(() => {
        dispatch({ type: type });
        dispatch(TeacherById(id));
      })
      .catch((error) => {
        if (error.request) console.log(error.request);
        else if (error.response) console.log(error.response);
        else console.log(error);
      });
  };
};
