import {
  ADD_CLASS,
  DELETE_CLASSSEC,
  GET_CLASS,
} from "../actiontypes/classtype";
import { DELETE_SUBJECTS, VIEW_SUBJECTS } from "../actiontypes/subjecttypes";

export default function (state = [], action) {
  switch (action.type) {
    case ADD_CLASS:
    case DELETE_CLASSSEC:
    case DELETE_SUBJECTS:
      return { ...state };

    case GET_CLASS:
      return { ...state, grades: action.payload };

    case VIEW_SUBJECTS:
      return { ...state, subjects: action.payload };

    default:
      return state;
  }
}
