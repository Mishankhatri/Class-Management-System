import { CLOSE_ANNOUNCEMENTS_BYID } from "../../actiontypes/admin/announcementtypes";
import {
  GET_TEACHER_DETAIL,
  ADD_TEACHER_DETAIL,
  GET_TEACHER_BYID,
  GET_LECTURE_NOTES,
  DELETE_LECTURE_NOTES,
  GET_TEACHER_GIVEN_ASSIGNMENT,
  DELETE_TEACHER_GIVEN_ASSIGNMENT,
  GET_TEACHER_ASSIGNMENT_BYID,
  GET_SUBMITTED_ASSIGNMENT,
  DELETE_TEACHER_ANNOUNCEMENT,
  GET_TEACHER_ANNOUNCEMENT,
  GET_TEACHER_ANNOUNCEMENTS_BYID,
  ASSIGN_TEACHER_SUBJECTS,
  UPDATE_TEACHER_DETAIL,
  UPDATE_TEACHER_PHOTO,
  POST_TEACHER_ANNOUNCEMENT,
  GET_TEACHER_ASSIGN,
} from "../../actiontypes/teacher/teacherdatatype";

const initialState = {
  isLoading: false,
  isOpen: false,
};

export default function teacherReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TEACHER_DETAIL:
      return { ...state, teacherDetail: action.payload };

    case ADD_TEACHER_DETAIL:
    case DELETE_LECTURE_NOTES:
    case DELETE_TEACHER_GIVEN_ASSIGNMENT:
    case DELETE_TEACHER_ANNOUNCEMENT:
    case ASSIGN_TEACHER_SUBJECTS:
    case UPDATE_TEACHER_PHOTO:
    case UPDATE_TEACHER_DETAIL:
    case POST_TEACHER_ANNOUNCEMENT:
      return { ...state };

    case GET_TEACHER_BYID:
      return { ...state, teacherId: action.payload };

    case GET_LECTURE_NOTES:
      return { ...state, lecturenotes: action.payload };

    case GET_TEACHER_GIVEN_ASSIGNMENT:
      return { ...state, assignments: action.payload };

    case GET_TEACHER_ASSIGNMENT_BYID:
      return { ...state, assignmentId: action.payload };

    case GET_TEACHER_ANNOUNCEMENTS_BYID:
      return { ...state, teacherNoticeId: action.payload, isOpen: true };

    case CLOSE_ANNOUNCEMENTS_BYID:
      return { ...state, isOpen: false };

    case GET_SUBMITTED_ASSIGNMENT:
      return { ...state, submittedAssignment: action.payload };

    case GET_TEACHER_ANNOUNCEMENT:
      return { ...state, teachernotices: action.payload };

    case GET_TEACHER_ASSIGN:
      return { ...state, assignedTeacherByUser: action.payload };

    default:
      return state;
  }
}
