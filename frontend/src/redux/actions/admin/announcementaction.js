import axiosInstance from "../../../axios";
import {
  CREATE_ADMIN_ANNOUNCEMENT,
  DELETE_ADMIN_ANNOUNCEMENTS,
  GET_ADMIN_ANNOUNCEMENTS_BYID,
  CLOSE_ANNOUNCEMENTS_BYID,
} from "../../actiontypes/admin/announcementtypes";
import { getData } from "../dataactions";

export const CreateAdminAnnouncement = (data, user) => {
  return function (dispatch) {
    axiosInstance
      .post("adminnotices/", {
        created_by: user.id,
        type: data.announcementTypeName.value,
        title: data.announcementTitle,
        details: data.announcementSubjects,
        announcement_for: data.announcementFor.value,
        files_by_admin: data?.announcemntFile[0]?.name,
      })
      .then(() => {
        dispatch({
          type: CREATE_ADMIN_ANNOUNCEMENT,
        });
      })
      .catch((error) => console.log(error.response));
  };
};

export const AdminAnnouncementDelete = (id) => {
  return function (dispatch) {
    axiosInstance
      .delete(`/adminnotices/${id}`)
      .then(() => {
        dispatch({ type: DELETE_ADMIN_ANNOUNCEMENTS });
        dispatch(getData("adminnotices"));
      })
      .catch((error) => console.log(error.response));
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

export const CloseAnnouncementModal = () => {
  return { type: CLOSE_ANNOUNCEMENTS_BYID };
};
