import { ADD_CLASS, GET_CLASS } from "../actiontypes/classtype";

export default function (state = [], action) {
  switch (action.type) {
    case ADD_CLASS:
      return { ...state };

    case GET_CLASS:
      return { ...state, grades: action.payload };

    default:
      return state;
  }
}
