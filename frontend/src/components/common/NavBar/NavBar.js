import React, { useState } from "react";
import * as BiIcons from "react-icons/bi";
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import * as VscIcons from "react-icons/vsc";
import { Link } from "react-router-dom";
import NavBarNotification from "./NavBarNotification";

import AnnouncementCard from "../AnnouncementCard";
import { useSelector, useDispatch } from "react-redux";
import { OpenNotification } from "./../../../redux/actions/admin/announcementaction";

function NavBar({ onClickHandler, username, show, image, name }) {
  const [showDropDown, setDropDown] = useState(false);
  const dispatch = useDispatch();

  const [showDropDownNotification, setDropDownNotification] = useState(false);

  const adminInitialState = useSelector((state) => state.admins);
  const teacherInitialState = useSelector((state) => state.teachers);

  return (
    <>
      {/* For showing announcement info card  */}
      {name === "student"
        ? teacherInitialState.isOpen && <AnnouncementCard name="student" />
        : adminInitialState.isOpen && <AnnouncementCard />}

      <div className={show ? "navigation" : "navigation close"}>
        <div className="navbar">
          <div className="left-section">
            <button
              className={show ? "backbtn active" : "backbtn"}
              onClick={onClickHandler}>
              <FaIcons.FaAlignLeft className="btn-outline-info" />
            </button>
          </div>
          <div className="middle-section">Class Management System</div>

          <div className="right-section">
            <div className="not-image">
              <div
                className="notification"
                onClick={() => {
                  setDropDownNotification(!showDropDownNotification);
                  dispatch(OpenNotification());
                }}>
                {!adminInitialState.showNewNotification ? (
                  <VscIcons.VscBell className="notification__icon" />
                ) : (
                  <VscIcons.VscBellDot className="notification__icon" />
                )}
              </div>
              <img src={image} alt="profile-img" className="profile-image" />
            </div>
            <div className="user-name">
              {username}
              <RiIcons.RiArrowDownSFill
                className="arrow"
                onClick={() => setDropDown(!showDropDown)}
              />
            </div>
          </div>
        </div>
        {/* //List of Announcement Latest 10 */}
        <NavBarNotification
          showDropDown={showDropDownNotification}
          setDropDown={setDropDownNotification}
          name={name}
        />
        <div className={showDropDown ? "menu active" : "menu inactive"}>
          <ul className="profile-options" style={{ padding: 10 }}>
            <li>
              <Link to={`/${name}/settings`} className="menu-link">
                <RiIcons.RiSettings5Fill className="menu-icon" />
                Settings
              </Link>
            </li>
            <li>
              <Link to={`/${name}/profiles`} className="menu-link">
                <BiIcons.BiUser className="menu-icon" />
                User Profile
              </Link>
            </li>
            <li>
              <Link to="logout" className="menu-link">
                <BiIcons.BiLogOut className="menu-icon" />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default NavBar;
