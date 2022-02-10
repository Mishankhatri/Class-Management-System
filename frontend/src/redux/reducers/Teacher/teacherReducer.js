import { GET_TEACHER_DETAIL } from "../../actiontypes/teacher/teacherdatatype";

const initialState = {
  isLoading: false,
};

export default function teacherReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TEACHER_DETAIL:
      return { ...state, teacherDetail: action.payload };

    // case GET_STUDENT_CLASS:
    //   return { ...state, classes: action.payload };

    // case GET_STUDENTCLASS_SID:
    //   return { ...state, studentId: action.payload };

    default:
      return state;
  }
}
