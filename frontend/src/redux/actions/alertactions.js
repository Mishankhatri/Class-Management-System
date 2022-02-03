import { CREATE_MESSAGES, GET_ERRORS } from "../actiontypes/alerttypes";

//Create message
export const createMessage = (msg) => {
  return {
    type: CREATE_MESSAGES,
    payload: msg,
  };
};

//Return errors
export const returnErrors = (msg, status) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status },
  };
};