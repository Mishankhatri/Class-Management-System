import React, { useEffect, useState } from "react";
import NotificationMessage from "./NotificationMessage";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import reverseArray from "../ReverseArray";
import Loading from "./../Loading";
import {
  AdminAnnouncementById,
  TeacherAnnouncementById,
} from "./../../../redux/actions/admin/announcementaction";
import { getData } from "../../../redux/actions/dataactions";

function NavBarNotification({ showDropDown, setDropDown, name }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData("adminnotices"));
  }, [dispatch]);

  const className = showDropDown
    ? "menu active notification"
    : "menu inactive notification";

  const {
    adminnotices: { results },
  } = useSelector((state) => state.data);
  const teacherAnnounce = useSelector((state) => state.teachers);

  const { student } = useSelector((state) => state.students);

  const { user } = useSelector((state) => state.auth);

  const currentStudentDetail =
    student && student.results.find((value) => (value.user.id = user.id));

  const adminnotices = results && reverseArray(results);
  const reverseTeacherNotices =
    teacherAnnounce?.teachernotices &&
    reverseArray(teacherAnnounce?.teachernotices).filter(
      (value) =>
        value.announcement_for_class.class_name ==
          currentStudentDetail?.current_grade.class_name &&
        value.announcement_for_class.section ==
          currentStudentDetail?.current_grade.section
    );

  const notices = name === "student" ? reverseTeacherNotices : adminnotices;

  const handleChange = (data) => {
    setDropDown(false);
    if (name === "student") {
      dispatch(TeacherAnnouncementById(data));
    } else dispatch(AdminAnnouncementById(data));
  };

  return notices ? (
    <React.Fragment>
      <div className={className}>
        <div className="heading">Notifications</div>
        {notices.map((value, index) => {
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
  ) : (
    <Loading />
  );
}

export default NavBarNotification;
