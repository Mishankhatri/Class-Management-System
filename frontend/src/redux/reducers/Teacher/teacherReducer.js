import {
  GET_TEACHER_DETAIL,
  ADD_TEACHER_DETAIL,
  GET_TEACHER_BYID,
  GET_LECTURE_NOTES,
  DELETE_LECTURE_NOTES,
} from "../../actiontypes/teacher/teacherdatatype";

const initialState = {
  isLoading: false,
};

export default function teacherReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TEACHER_DETAIL:
      return { ...state, teacherDetail: action.payload };

    case ADD_TEACHER_DETAIL:
    case DELETE_LECTURE_NOTES:
      return { ...state };

    case GET_TEACHER_BYID:
      return { ...state, teacherId: action.payload };

    case GET_LECTURE_NOTES:
      return { ...state, lecturenotes: action.payload };

    default:
      return state;
  }
}
