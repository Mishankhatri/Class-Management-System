/* eslint-disable import/no-anonymous-default-export */
import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_FAILED,
  AUTH_ERR,
  USER_LOADING,
  UPDATE_SUCCESS,
} from "../actiontypes/authtypes";

const initialState = {
  access: localStorage.getItem("access_token"),
  refresh: localStorage.getItem("refresh_token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("access_token", action.payload.access);
      localStorage.setItem("refresh_token", action.payload.refresh);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case REGISTER_SUCCESS:
    case REGISTER_FAILED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
      };

    case UPDATE_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
      };

    case AUTH_ERR:
    case LOGIN_FAILED:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
