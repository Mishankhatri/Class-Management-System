/* eslint-disable import/no-anonymous-default-export */
import { GET_ERRORS } from "../actiontypes/alerttypes";

const initialState = {
    msg: {},
    status: null,
  };
  
export default function (state = initialState, action) {
    switch (action.type) {
      case GET_ERRORS:
        return {
          msg: action.payload.msg,
          status: action.payload.status,
        };
  
      default:
        return state;
    }
  }