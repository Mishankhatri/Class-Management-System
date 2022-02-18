import {
  ADD_CLASS,
  ADD_CLASS_SECTION,
  DELETE_CLASSSEC,
  FILTER_CLASS,
  GET_CLASS,
} from "../actiontypes/classtype";
import {
  DELETE_SUBJECTS,
  VIEW_SUBJECTS,
  VIEW_SUBJECTS_ID,
} from "../actiontypes/subjecttypes";

export default function (state = [], action) {
  switch (action.type) {
    case ADD_CLASS:
    case DELETE_CLASSSEC:
    case DELETE_SUBJECTS:
    case ADD_CLASS_SECTION:
      return { ...state };

    case GET_CLASS:
      return { ...state, grades: action.payload };

    case FILTER_CLASS:
      return { ...state, filterClass: action.payload };

    case VIEW_SUBJECTS:
      return { ...state, subjects: action.payload };

    case VIEW_SUBJECTS_ID:
      return { ...state, subjectsId: action.payload };

    default:
      return state;
  }
}
