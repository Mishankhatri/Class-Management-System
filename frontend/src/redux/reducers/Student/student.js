import {
  UPDATE_STUDENT_PARENT_DETAIL,
  UPDATE_STUDENT_ACADEMIC_DETAIL,
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
} from "../../actiontypes/student/studentdatatype";

const initialState = {
  isLoading: false,
};

export default function studentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STUDENT_DETAIL:
      return { ...state, isLoading: false, student: action.payload };

    case GET_STUDENT_CLASS:
      return { ...state, classes: action.payload };

    case GET_STUDENTCLASS_SID:
      return { ...state, studentId: action.payload };

    case GET_STUDENT_PARENTS:
      return { ...state, studentParent: action.payload };

    case GET_STUDENT_PARENTS_BYID:
      return { ...state, studentParentID: action.payload };

    case GET_STUDENT_ATTENDANCE:
      return { ...state, attendance: action.payload };

    case GET_STUDENT_ATTENDANCE_FILTER:
      return { ...state, attendanceFilter: action.payload };

    case GET_STUDENT_USERID:
      return { ...state, studentUserID: action.payload };

    case DELETE_STUDENT:
    case DELETE_ATTENDANCE:
    case ADD_STUDENT_DETAIL:
    case ADD_STUDENT_PARENT_DETAIL:
    case UPDATE_STUDENT_PHOTO:
    case UPDATE_STUDENT_DETAIL:
    case UPDATE_STUDENT_ACADEMIC_DETAIL:
    case UPDATE_STUDENT_PARENT_DETAIL:
      return { ...state };

    default:
      return state;
  }
}
