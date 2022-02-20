import React, { useEffect, useState } from "react";
import NotificationMessage from "./NotificationMessage";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import reverseArray from "../ReverseArray";
import { GET_DETAILS } from "./../../../redux/actions/student/studentactions";
import {
  AdminAnnouncementById,
  GetAdminFilterAnnouncement,
  GetAdminNotices_forTeacher,
  GetTeacherAnnouncement,
  TeacherAnnouncementById,
} from "./../../../redux/actions/admin/announcementaction";

function NavBarNotification({ showDropDown, setDropDown, name }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (name === "admin") {
      dispatch(GetAdminFilterAnnouncement("ordering=-id&for=all"));
    } else if (name === "student") {
      dispatch(GET_DETAILS("/student", "GET_STUDENT_DETAIL"));
      dispatch(GetTeacherAnnouncement("?ordering=-id"));
    } else dispatch(GetAdminNotices_forTeacher("ordering=-id"));
  }, [dispatch]);

  const className = showDropDown
    ? "menu active notification"
    : "menu inactive notification";

  const { adminfilternotices } = useSelector((state) => state.admins);
  const { teacherfilternotices } = useSelector((state) => state.admins);
  const { teachernotices: teacherForStudent } = useSelector(
    (state) => state.teachers
  );
  const { student } = useSelector((state) => state.students);

  const { user } = useSelector((state) => state.auth);
  const currentStudentDetail =
    student && student.results.find((value) => (value.user.id = user.id));

  const adminnotices = adminfilternotices && adminfilternotices.results;
  const teachernotices = teacherfilternotices && teacherfilternotices.results;
  const studentnotices = teacherForStudent && teacherForStudent.results;

  const studentfilternotices =
    studentnotices &&
    studentnotices.filter(
      (value) =>
        value.announcement_for_class.class_name ==
          currentStudentDetail?.current_grade.class_name &&
        value.announcement_for_class.section ==
          currentStudentDetail?.current_grade.section
    );

  const notices =
    name === "admin"
      ? adminnotices
      : name === "teacher"
      ? teachernotices
      : studentfilternotices;

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
                by={value.created_by.fullname}
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
