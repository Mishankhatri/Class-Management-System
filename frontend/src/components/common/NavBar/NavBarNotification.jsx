import React, { useEffect } from "react";
import NotificationMessage from "./NotificationMessage";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import {
  AdminAnnouncementById,
  GetAdminFilterAnnouncement,
  GetAdminNotices_forTeacher,
  TeacherAnnouncementById,
} from "./../../../redux/actions/admin/announcementaction";
import axiosInstance from "../../../axios";
import { GetTeacherFilterAnnouncement } from "./../../../redux/actions/teacher/teacheractions";

function NavBarNotification({ showDropDown, setDropDown, name }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (name === "admin") {
      dispatch(GetAdminFilterAnnouncement("ordering=-id&for=all"));
    } else if (name === "student") {
      axiosInstance
        .get(`/student?user=${user.id}`)
        .then(({ data: { results } }) => {
          dispatch(
            GetTeacherFilterAnnouncement(
              `ordering=-id&classname=${results[0].current_grade.id}`
            )
          );
        });
    } else dispatch(GetAdminNotices_forTeacher("ordering=-id"));
  }, [dispatch]);

  const className = showDropDown
    ? "menu active notification"
    : "menu inactive notification";

  const { adminfilternotices } = useSelector((state) => state.admins);
  const { teacherfilternotices } = useSelector((state) => state.admins);
  const { teacherNoticesFilter } = useSelector((state) => state.teachers);
  const { user } = useSelector((state) => state.auth);

  const adminnotices = adminfilternotices && adminfilternotices.results;
  const teachernotices = teacherfilternotices && teacherfilternotices.results;

  const notices =
    name === "admin"
      ? adminnotices
      : name === "teacher"
      ? teachernotices
      : teacherNoticesFilter;

  const handleChange = (data) => {
    setDropDown(false);
    if (name === "student") {
      dispatch(TeacherAnnouncementById(data));
    } else dispatch(AdminAnnouncementById(data));
  };

  return (
    <React.Fragment>
      <div className={className}>
        <div className="heading">Notifications</div>
        {notices &&
          notices.map((value, index) => {
            const stringLength = value.details.length;
            const messageText =
              stringLength > 80
                ? value.details.slice(0, 80).concat("...")
                : value.details;
            const dates = <Moment fromNow>{value.created_at}</Moment>;

            return (
              <NotificationMessage
                messageText={messageText}
                by={value.created_by.username}
                time={dates}
                ProfileImage={value.created_by.profile_image}
                key={index}
                onClick={() => handleChange(value.id)}
              />
            );
          })}
      </div>
    </React.Fragment>
  );
}

export default NavBarNotification;
