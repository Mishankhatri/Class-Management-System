import React, { useState } from "react";
import NotificationMessage from "./NotificationMessage";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import reverseArray from "../ReverseArray";
import Loading from "./../Loading";
import { AdminAnnouncementById } from "./../../../redux/actions/admin/announcementaction";

function NavBarNotification({ showDropDown, setDropDown }) {
  const dispatch = useDispatch();

  const className = showDropDown
    ? "menu active notification"
    : "menu inactive notification";

  const {
    adminnotices: { results },
  } = useSelector((state) => state.data);

  const adminnotices = results && reverseArray(results);

  const handleChange = (data) => {
    setDropDown(false);
    dispatch(AdminAnnouncementById(data));
  };

  return adminnotices ? (
    <React.Fragment>
      <div className={className}>
        <div className="heading">Notifications</div>
        {adminnotices.map((value, index) => {
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
