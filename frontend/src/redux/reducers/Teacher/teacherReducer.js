import {
  GET_TEACHER_DETAIL,
  ADD_TEACHER_DETAIL,
} from "../../actiontypes/teacher/teacherdatatype";

const initialState = {
  isLoading: false,
};

export default function teacherReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TEACHER_DETAIL:
      return { ...state, teacherDetail: action.payload };

    case ADD_TEACHER_DETAIL:
      return { ...state };

    // case GET_STUDENTCLASS_SID:
    //   return { ...state, studentId: action.payload };

    default:
      return state;
  }
}
