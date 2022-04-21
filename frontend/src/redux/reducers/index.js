import { combineReducers } from "redux";
import errors from "./errors";
import success from "./success";
import messages from "./messages";
import auth from "./auth";
import data from "./data";
import studentReducer from "./Student/studentReducer";
import teacherReducer from "./Teacher/teacherReducer";
import classReducer from "./classReducer";
import adminReducer from "./Admin/adminReducer";

export default combineReducers({
  errors,
  success,
  messages,
  auth,
  data,
  students: studentReducer,
  teachers: teacherReducer,
  classes: classReducer,
  admins: adminReducer,
});
