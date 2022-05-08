import {
  UPDATE_STUDENT_PARENT_DETAIL,
  UPDATE_STUDENT_ACADEMIC_DETAIL,
  SUBMIT_ASSIGNMENTS,
  CHANGE_SUBMIT_ASSIGNMENTS,
  GET_STUDENT_ASSIGNMENT_FILTER,
} from "../../actiontypes/student/studentdatatype";

import {
  GET_STUDENT_DETAIL,
  GET_STUDENT_CLASS,
  GET_STUDENTCLASS_SID,
  GET_STUDENT_USERID,
  GET_STUDENT_PARENTS,
  DELETE_STUDENT,
  GET_STUDENT_ATTENDANCE,
  DELETE_ATTENDANCE,
  ADD_STUDENT_DETAIL,
  GET_STUDENT_PARENTS_BYID,
  ADD_STUDENT_PARENT_DETAIL,
  GET_STUDENT_ATTENDANCE_FILTER,
  UPDATE_STUDENT_PHOTO,
  UPDATE_STUDENT_DETAIL,
  STUDENT_DATA_LOADING,
  GET_STUDENTS_FOR_ATTENDANCE,
} from "../../actiontypes/student/studentdatatype";

const initialState = {
  isLoading: false,
  studentDetails: null,
  studentParent: null,
};

export default function studentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STUDENT_DETAIL:
      return { ...state, isLoading: false, student: action.payload };

    case STUDENT_DATA_LOADING:
      return { ...state, isLoading: true };

    case GET_STUDENTS_FOR_ATTENDANCE:
      return {
        ...state,
        isLoading: false,
        students_for_attendance: action.payload,
      };

    case GET_STUDENT_CLASS:
      return { ...state, isLoading: false, classes: action.payload };

    case GET_STUDENTCLASS_SID:
      return { ...state, isLoading: false, studentId: action.payload };

    case GET_STUDENT_PARENTS:
      return { ...state, isLoading: false, studentParent: action.payload };

    case GET_STUDENT_PARENTS_BYID:
      return { ...state, isLoading: false, studentParentID: action.payload };

    case GET_STUDENT_ATTENDANCE:
      return { ...state, isLoading: false, attendance: action.payload };

    case GET_STUDENT_ATTENDANCE_FILTER:
      return { ...state, isLoading: false, attendanceFilter: action.payload };

    case GET_STUDENT_USERID:
      return { ...state, isLoading: false, studentDetails: action.payload };

    case GET_STUDENT_ASSIGNMENT_FILTER:
      return {
        ...state,
        isLoading: false,
        filterStudentAssignment: action.payload,
      };

    case DELETE_STUDENT:
    case DELETE_ATTENDANCE:
    case ADD_STUDENT_DETAIL:
    case ADD_STUDENT_PARENT_DETAIL:
    case UPDATE_STUDENT_PHOTO:
    case UPDATE_STUDENT_DETAIL:
    case UPDATE_STUDENT_ACADEMIC_DETAIL:
    case UPDATE_STUDENT_PARENT_DETAIL:
    case SUBMIT_ASSIGNMENTS:
    case CHANGE_SUBMIT_ASSIGNMENTS:
      return { ...state };

    default:
      return state;
  }
}
