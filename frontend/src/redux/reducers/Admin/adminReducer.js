import {
  CHANGE_ADMIN_PASSWORD,
  DELETE_TIMETABLES,
  GET_TIMETABLES,
  GET_TIMETABLES_ID,
  UPDATE_ADMIN_INFO,
  UPDATE_TIMETABLES,
  UPDATE_USER_IMAGE,
  SAVE_QUERY_DATA,
  GET_TABLE_DATA,
} from "../../actiontypes/admin/admindatatype";

import {
  CLOSE_ANNOUNCEMENTS_BYID,
  CREATE_ADMIN_ANNOUNCEMENT,
  DELETE_ADMIN_ANNOUNCEMENTS,
  GET_ADMIN_ANNOUNCEMENTS_BYID,
  GET_ADMIN_ANNOUNCEMENT,
  OPEN_NOTIFICATION,
  GET_ADMIN_FILTER_ANNOUNCEMENT,
  GET_ADMIN_TEACHER_FILTER_ANNOUNCEMENT,
} from "../../actiontypes/admin/announcementtypes";

const initialState = {
  isOpen: false,
  showNewNotification: true,
  query: {
    filters: [],
    page: 0,
    pageSize: 10,
    search: "",
    totalCount: 0,
  },
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_ADMIN_ANNOUNCEMENTS:
    case CHANGE_ADMIN_PASSWORD:
    case UPDATE_ADMIN_INFO:
    case DELETE_TIMETABLES:
    case UPDATE_TIMETABLES:
    case UPDATE_USER_IMAGE:
      return { ...state };

    case CREATE_ADMIN_ANNOUNCEMENT:
    case "ON_LOGOUT_RESET":
      return { ...state, showNewNotification: true };

    case GET_ADMIN_ANNOUNCEMENTS_BYID:
      return { ...state, adminnoticesId: action.payload, isOpen: true };

    case GET_ADMIN_ANNOUNCEMENT:
      return { ...state, adminnotices: action.payload };

    case GET_ADMIN_FILTER_ANNOUNCEMENT:
      return { ...state, adminfilternotices: action.payload };

    case GET_ADMIN_TEACHER_FILTER_ANNOUNCEMENT:
      return { ...state, teacherfilternotices: action.payload };

    case CLOSE_ANNOUNCEMENTS_BYID:
      return { ...state, isOpen: false };

    case OPEN_NOTIFICATION:
      return { ...state, showNewNotification: false };

    case SAVE_QUERY_DATA:
      return { ...state, query: action.payload };

    case GET_TABLE_DATA:
      return { ...state, tableData: action.payload };

    case GET_TIMETABLES:
      return { ...state, timetables: action.payload };

    case GET_TIMETABLES_ID:
      return { ...state, timetablesId: action.payload };

    default:
      return state;
  }
}
