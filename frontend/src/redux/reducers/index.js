import { combineReducers } from "redux";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import data from "./data";
import studentReducer from "./Student/student";
import teacherReducer from "./Teacher/teacherReducer";
import classReducer from "./classReducer";

export default combineReducers({
  errors,
  messages,
  auth,
  data,
  students: studentReducer,
  teachers: teacherReducer,
  classes: classReducer,
});
