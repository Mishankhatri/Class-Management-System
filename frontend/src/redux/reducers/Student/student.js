import {
  GET_STUDENT_DETAIL,
  GET_STUDENT_CLASS,
  GET_STUDENTCLASS_SID,
  GET_STUDENT_PARENTS,
  DELETE_STUDENT,
  GET_STUDENT_ATTENDANCE,
  DELETE_ATTENDANCE,
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

    case GET_STUDENT_ATTENDANCE:
      return { ...state, attendance: action.payload };

    case DELETE_STUDENT:
    case DELETE_ATTENDANCE:
      return { ...state };

    default:
      return state;
  }
}
