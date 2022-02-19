import {
  CHANGE_ADMIN_PASSWORD,
  DELETE_TIMETABLES,
  GET_TIMETABLES,
  GET_TIMETABLES_ID,
  UPDATE_ADMIN_INFO,
  UPDATE_TIMETABLES,
} from "../../actiontypes/admin/admindatatype";

import {
  CLOSE_ANNOUNCEMENTS_BYID,
  CREATE_ADMIN_ANNOUNCEMENT,
  DELETE_ADMIN_ANNOUNCEMENTS,
  GET_ADMIN_ANNOUNCEMENTS_BYID,
  GET_ADMIN_ANNOUNCEMENT,
  OPEN_NOTIFICATION,
  GET_ADMIN_FILTER_ANNOUNCEMENT,
} from "../../actiontypes/admin/announcementtypes";

const initialState = {
  isOpen: false,
  showNewNotification: true,
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_ADMIN_ANNOUNCEMENTS:
    case CHANGE_ADMIN_PASSWORD:
    case UPDATE_ADMIN_INFO:
    case DELETE_TIMETABLES:
    case UPDATE_TIMETABLES:
      return { ...state };

    case CREATE_ADMIN_ANNOUNCEMENT:
      return { ...state, showNewNotification: true };

    case GET_ADMIN_ANNOUNCEMENTS_BYID:
      return { ...state, adminnoticesId: action.payload, isOpen: true };

    case GET_ADMIN_ANNOUNCEMENT:
      return { ...state, adminnotices: action.payload };

    case GET_ADMIN_FILTER_ANNOUNCEMENT:
      return { ...state, adminfilternotices: action.payload };

    case CLOSE_ANNOUNCEMENTS_BYID:
      return { ...state, isOpen: false };

    case OPEN_NOTIFICATION:
      return { ...state, showNewNotification: false };

    case GET_TIMETABLES:
      return { ...state, timetables: action.payload };

    case GET_TIMETABLES_ID:
      return { ...state, timetablesId: action.payload };

    default:
      return state;
  }
}
