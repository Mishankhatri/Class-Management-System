import {
  CREATE_MESSAGES,
  GET_ERRORS,
  GET_SUCCESS,
} from "../actiontypes/alerttypes";

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

//Return errors
export const returnSuccess = (msg) => {
  return {
    type: GET_SUCCESS,
    payload: { msg },
  };
};
