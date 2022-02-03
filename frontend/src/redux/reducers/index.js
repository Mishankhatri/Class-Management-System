import { combineReducers } from "redux";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import data from "./data";

export default combineReducers({
  errors,
  messages,
  auth,
  data,
});
