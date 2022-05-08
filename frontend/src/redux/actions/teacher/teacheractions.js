import axiosInstance from "../../../axios";
import { axiosInstanceMultipart } from "../../../axios";
import { createMessage, returnErrors } from "../alertactions";
import {
  GET_TEACHER_DETAIL,
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
  POST_TEACHER_ANNOUNCEMENT,
  GET_TEACHER_ASSIGN,
  ADD_TEACHER_ASSIGNMENT,
  CHANGE_TEACHER_ASSIGNMENT,
  ADD_LECTURE_NOTES,
  GET_LECTURE_NOTES_FILTER,
  GET_TEACHER_ASSIGNMENT_FILTER,
  GET_TEACHER_ANNOUNCEMENT_FILTER,
  ADD_BULK_ATTENDANCE,
  GET_ATTENDANCE_BYID,
  CHANGE_STUDENT_ATTENDANCE,
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
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const GetTeacherAssign = (userId) => {
  return function (dispatch) {
    axiosInstance
      .get(`/AssignTeacherToSubjectsAPI?user=${userId}`)
      .then(({ data }) => {
        dispatch({
          type: GET_TEACHER_ASSIGN,
          payload: data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
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
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const AddTeacherDetail = (postData, url, type) => {
  return function (dispatch) {
    const body = postData;
    axiosInstanceMultipart
      .post(`${url}/`, body)
      .then(() => {
        dispatch({
          type: type,
        });
      })
      .then(() => {
        dispatch(createMessage({ teacherAdd: "Teacher Added Successfuly" }));
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const AssignTeacherSubjects = (postData) => {
  return function (dispatch) {
    const body = postData;
    axiosInstance
      .post("AssignTeacherToSubjectsAPI/", body)
      .then(() => {
        dispatch({
          type: ASSIGN_TEACHER_SUBJECTS,
        });
      })
      .then(() => {
        dispatch(
          createMessage({
            assignTeacher: "Teacher Assigned Successully",
          })
        );
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
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
      })
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        dispatch(
          createMessage({
            deleteTeacher: "Teacher Deleted Successully",
          })
        );
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
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
          .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
          });
  };
};

export const GetLectureNotesFilter = (filter) => {
  return function (dispatch) {
    axiosInstance
      .get(`/lecturenotes${filter}`)
      .then(({ data: { results } }) => {
        dispatch({
          type: GET_LECTURE_NOTES_FILTER,
          payload: results,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const DeleteLectureNotes = (id, teacherId) => {
  return function (dispatch) {
    axiosInstance
      .delete(`/lecturenotes/${id}`)
      .then(() => {
        dispatch({ type: DELETE_LECTURE_NOTES });
        dispatch(GetLectureNotes(teacherId));
      })
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        dispatch(
          createMessage({
            deleteLecture: "Lecture Notes Deleted Successully",
          })
        );
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

//Assignment
export const GetTeacherGivenAssignment = (username) => {
  return function (dispatch) {
    axiosInstance
      .get(`/givenassignments?teacher=${username}`)
      .then(({ data: { results } }) => {
        dispatch({
          type: GET_TEACHER_GIVEN_ASSIGNMENT,
          payload: results,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const GetTeacherAssignmentFilter = (filter) => {
  return function (dispatch) {
    axiosInstance
      .get(`/givenassignments${filter}`)
      .then(({ data: { results } }) => {
        dispatch({
          type: GET_TEACHER_ASSIGNMENT_FILTER,
          payload: results,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const DeleteTeacherGivenAssignment = (id, user) => {
  return function (dispatch) {
    axiosInstance
      .delete(`/givenassignments/${id}`)
      .then(() => {
        dispatch({ type: DELETE_TEACHER_GIVEN_ASSIGNMENT });
        dispatch(GetTeacherGivenAssignment(user.username));
      })
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        dispatch(
          createMessage({
            deleteTeacherAssignment: "Assignment Deleted Successully",
          })
        );
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
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
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const AttendanceById = (id) => {
  return function (dispatch) {
    axiosInstance
      .get(`/attendance/${id}`)
      .then(({ data }) => {
        dispatch({
          type: GET_ATTENDANCE_BYID,
          payload: data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const ChangeTeacherAssignment = (postdata, id) => {
  return function (dispatch) {
    const body = postdata;
    axiosInstance
      .patch(`/givenassignments/${id}/`, body)
      .then(({ data }) => {
        dispatch({
          type: CHANGE_TEACHER_ASSIGNMENT,
          payload: data,
        });
      })
      .then(() => {
        dispatch(
          createMessage({
            assignmentChanged: "Assignment Details Changed Successfully",
          })
        );
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        if (err.response) console.log(err.response);
        else if (err.request) console.log(err.request);
        else console.log(err);
      });
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
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
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
          .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
          });
  };
};

export const GetTeacherFilterAnnouncement = (filter) => {
  return function (dispatch) {
    axiosInstance
      .get(`/teachernotices?${filter}`)
      .then(({ data: { results } }) => {
        dispatch({
          type: GET_TEACHER_ANNOUNCEMENT_FILTER,
          payload: results,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const DeleteTeacherAnnouncements = (id, user) => {
  return function (dispatch) {
    axiosInstance
      .delete(`/teachernotices/${id}`)
      .then(() => {
        dispatch({ type: DELETE_TEACHER_ANNOUNCEMENT });
        dispatch(GetTeacherAnnouncement(user.username));
      })
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        dispatch(
          createMessage({
            deleteteacherAnnouncement: "Announcement Deleted Successully",
          })
        );
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
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
      .then(() => {
        dispatch(
          createMessage({
            changeTeacher: "Teacher Detail Changed Successully",
          })
        );
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const CreateTeacherAnnouncement = (postdata) => {
  return function (dispatch) {
    const body = postdata;
    axiosInstanceMultipart
      .post("teachernotices/", body)
      .then(() => {
        dispatch({
          type: POST_TEACHER_ANNOUNCEMENT,
        });
      })
      .then(() => {
        dispatch(
          createMessage({
            createAnnouncement: "Announcement Created Successully",
          })
        );
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const AddTeacherAssignment = (postdata) => {
  return function (dispatch) {
    const body = postdata;
    axiosInstanceMultipart
      .post(`givenassignments/`, body)
      .then(() => {
        dispatch({ type: ADD_TEACHER_ASSIGNMENT });
      })
      .then(() => {
        dispatch(
          createMessage({
            assignmentAdded: "Assignment Added Successully",
          })
        );
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        console.log(err.request);
      });
  };
};

export const AddLectureNotes = (postdata) => {
  return function (dispatch) {
    const body = postdata;
    axiosInstanceMultipart
      .post(`lecturenotes/`, body)
      .then(() => {
        dispatch({ type: ADD_LECTURE_NOTES });
      })
      .then(() => {
        dispatch(
          createMessage({
            addLectureNotes: "Lecture Notes Added  Successully",
          })
        );
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        console.log(err.request);
      });
  };
};

export const CreateBulkAttendance = (postdata) => {
  return function (dispatch) {
    const body = postdata;
    axiosInstance
      .post("blukattendance/", body)
      .then(() => {
        dispatch({
          type: ADD_BULK_ATTENDANCE,
        });
      })
      .then(() => {
        dispatch(
          createMessage({
            createBulkAttendace: "Attendance Saved Successully",
          })
        );
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const ChangeStudentAttendance = (postdata, id) => {
  return function (dispatch) {
    const body = postdata;
    axiosInstance
      .patch(`/attendance/${id}/`, body)
      .then(({ data }) => {
        dispatch({
          type: CHANGE_STUDENT_ATTENDANCE,
          payload: data,
        });
      })
      .then(() => {
        dispatch(
          createMessage({
            attendanceChanged: "Attendance Details Changed Successfully",
          })
        );
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        if (err.response) console.log(err.response);
        else if (err.request) console.log(err.request);
        else console.log(err);
      });
  };
};
