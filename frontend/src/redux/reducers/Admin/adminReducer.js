import {
  CHANGE_ADMIN_PASSWORD,
  DELETE_TIMETABLES,
  GET_TIMETABLES,
  UPDATE_ADMIN_INFO,
} from "../../actiontypes/admin/admindatatype";
import {
  CLOSE_ANNOUNCEMENTS_BYID,
  CREATE_ADMIN_ANNOUNCEMENT,
  DELETE_ADMIN_ANNOUNCEMENTS,
  GET_ADMIN_ANNOUNCEMENTS_BYID,
} from "../../actiontypes/admin/announcementtypes";

import { ADD_TIMETABLES } from "./../../actiontypes/admin/admindatatype";

const initialState = {
  isOpen: false,
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ADMIN_ANNOUNCEMENT:
    case DELETE_ADMIN_ANNOUNCEMENTS:
    case CHANGE_ADMIN_PASSWORD:
    case UPDATE_ADMIN_INFO:
    case DELETE_TIMETABLES:
      return { ...state };

    case GET_ADMIN_ANNOUNCEMENTS_BYID:
      return { ...state, adminnoticesId: action.payload, isOpen: true };

    case CLOSE_ANNOUNCEMENTS_BYID:
      return { ...state, isOpen: false };

    case GET_TIMETABLES:
      return { ...state, timetables: action.payload };

    default:
      return state;
  }
}
