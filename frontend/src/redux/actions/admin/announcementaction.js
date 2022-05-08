import axiosInstance from "../../../axios";
import {
  CREATE_ADMIN_ANNOUNCEMENT,
  DELETE_ADMIN_ANNOUNCEMENTS,
  GET_ADMIN_ANNOUNCEMENTS_BYID,
  GET_ADMIN_ANNOUNCEMENT,
  CLOSE_ANNOUNCEMENTS_BYID,
  OPEN_NOTIFICATION,
  GET_ADMIN_FILTER_ANNOUNCEMENT,
  GET_ADMIN_TEACHER_FILTER_ANNOUNCEMENT,
} from "../../actiontypes/admin/announcementtypes";
import { getData } from "../dataactions";
import {
  GET_TEACHER_ANNOUNCEMENT,
  GET_TEACHER_ANNOUNCEMENTS_BYID,
} from "./../../actiontypes/teacher/teacherdatatype";
import { axiosInstanceMultipart } from "./../../../axios";
import { createMessage, returnErrors } from "../alertactions";

export const CreateAdminAnnouncement = (postdata) => {
  return function (dispatch) {
    const body = postdata;
    axiosInstanceMultipart
      .post("adminnotices/", body)
      .then(() => {
        dispatch({
          type: CREATE_ADMIN_ANNOUNCEMENT,
        });
        dispatch(GetAdminFilterAnnouncement("ordering=-id&for=all"));
        dispatch(GetAdminAnnouncement());
      })
      .then(() => {
        dispatch(
          createMessage({
            createAnnouncement: "Announcement Created Successully",
          })
        );
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const AdminAnnouncementDelete = (id) => {
  return function (dispatch) {
    axiosInstance
      .delete(`/adminnotices/${id}`)
      .then(() => {
        dispatch({ type: DELETE_ADMIN_ANNOUNCEMENTS });
        dispatch(GetAdminFilterAnnouncement("ordering=-id&for=all"));
      })
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        dispatch(
          createMessage({
            deleteAnnouncement: "Announcement Deleted Successully",
          })
        );
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const AdminAnnouncementDeleteSpecific = (id, user) => {
  return function (dispatch) {
    axiosInstance
      .delete(`/adminnotices/${id}`)
      .then(() => {
        dispatch({ type: DELETE_ADMIN_ANNOUNCEMENTS });
        dispatch(GetAdminAnnouncement(`admin=${user.username}&ordering=-id`));
      })
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        dispatch(
          createMessage({
            deleteAnnouncement: "Announcement Deleted Successully",
          })
        );
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const AdminAnnouncementById = (id) => {
  return function (dispatch) {
    axiosInstance
      .get(`/adminnotices/${id}`)
      .then(({ data }) => {
        dispatch({
          type: GET_ADMIN_ANNOUNCEMENTS_BYID,
          payload: data,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const GetAdminAnnouncement = (filter) => {
  return function (dispatch) {
    filter
      ? axiosInstance
          .get(`/adminnotices/?${filter}`)
          .then(({ data }) => {
            dispatch({
              type: GET_ADMIN_ANNOUNCEMENT,
              payload: data,
            });
          })
          .catch((error) => console.log(error))
      : axiosInstance
          .get(`/adminnotices`)
          .then(({ data }) => {
            dispatch({
              type: GET_ADMIN_ANNOUNCEMENT,
              payload: data,
            });
          })
          .catch((error) => console.log(error));
  };
};

export const GetTeacherAnnouncement = (filter) => {
  return function (dispatch) {
    filter
      ? axiosInstance
          .get(`/teachernotices${filter}`)
          .then(({ data }) => {
            dispatch({
              type: GET_TEACHER_ANNOUNCEMENT,
              payload: data,
            });
          })
          .catch((error) => console.log(error))
      : axiosInstance
          .get(`/teachernotices`)
          .then(({ data }) => {
            dispatch({
              type: GET_TEACHER_ANNOUNCEMENT,
              payload: data,
            });
          })
          .catch((error) => console.log(error));
  };
};

export const GetAdminFilterAnnouncement = (filter) => {
  return function (dispatch) {
    axiosInstance
      .get(`/adminnotices?${filter}`)
      .then(({ data }) => {
        dispatch({
          type: GET_ADMIN_FILTER_ANNOUNCEMENT,
          payload: data,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const TeacherAnnouncementById = (id) => {
  return function (dispatch) {
    axiosInstance
      .get(`/teachernotices/${id}`)
      .then(({ data }) => {
        dispatch({
          type: GET_TEACHER_ANNOUNCEMENTS_BYID,
          payload: data,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const CloseAnnouncementModal = () => {
  return { type: CLOSE_ANNOUNCEMENTS_BYID };
};

export const OpenNotification = () => {
  return { type: OPEN_NOTIFICATION };
};

export const GetAdminNotices_forTeacher = (filter) => {
  return function (dispatch) {
    axiosInstance
      .get(`/adminnotices?${filter}`)
      .then(({ data }) => {
        dispatch({
          type: GET_ADMIN_TEACHER_FILTER_ANNOUNCEMENT,
          payload: data,
        });
      })
      .catch((error) => console.log(error));
  };
};
