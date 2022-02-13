import axiosInstance from "../../../axios";
import { returnErrors } from "../alertactions";
import {
  CHANGE_ADMIN_PASSWORD,
  UPDATE_ADMIN_INFO,
} from "./../../actiontypes/admin/admindatatype";

export const ChangeAdminPassword = (data) => {
  return function (dispatch) {
    axiosInstance
      .put("user/changepassword/", {
        old_password: data.settingsCurrentPassword,
        password: data.settingsNewPassword,
        password2: data.settingsRePassword,
      })
      .then(() => dispatch({ type: CHANGE_ADMIN_PASSWORD }))
      .catch(({ response }) => {
        dispatch(returnErrors(response.data, response.status));
      });
  };
};

export const UpdateUserInfo = (data) => {
  return function (dispatch) {
    axiosInstance
      .patch("user/profile/update/", {
        username: data.username,
        email: data.email,
        fullname: data.fullname,
      })
      .then(() => dispatch({ type: UPDATE_ADMIN_INFO }))
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        console.log(err.response);
      });
  };
};

export const ChangeUserImage = (data) => {
  return function (dispatch) {
    axiosInstance
      .put("user/profile/update/", {
        // username: data.username,
        // email: data.email,
        // fullname: data.fullname,
        // profile_image,
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        console.log(err.response);
      });
  };
};
