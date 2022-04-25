/* eslint-disable import/no-anonymous-default-export */

import {
  DATA_LOADED,
  DATA_LOADING,
  FETCH_ERROR,
  GET_COUNT,
} from "../actiontypes/datatypes";

const initialState = {
  isLoading: false,
  adminnotices: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DATA_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case DATA_LOADED:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    case FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case GET_COUNT:
      return {
        ...state,
        isLoading: false,
        total_count : action.payload
      };
    default:
      return state;
  }
}
