import React, { useState } from "react";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import NavBarNotification from "./NavBarNotification";

import AnnouncementCard from "../AnnouncementCard";
import { useSelector } from "react-redux";

function NavBar({ onClickHandler, username, show, image, name }) {
  const [showDropDown, setDropDown] = useState(false);
  const [showDropDownNotification, setDropDownNotification] = useState(false);

  const adminnotices = useSelector((state) => state.admins);

  return (
    <>
      {adminnotices.isOpen && <AnnouncementCard />}

      <div className={show ? "navigation" : "navigation close"}>
        <div className="navbar">
          <div className="left-section">
            <button
              className={show ? "backbtn active" : "backbtn"}
              onClick={onClickHandler}>
              <FaIcons.FaAlignLeft className="btn-outline-info" />
            </button>
          </div>

          <div className="right-section">
            <div className="not-image">
              <div
                className="notification"
                onClick={() =>
                  setDropDownNotification(!showDropDownNotification)
                }>
                <div className="notification__symbol"></div>
                <BsIcons.BsBell className="notification__icon" />
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
        <NavBarNotification
          showDropDown={showDropDownNotification}
          setDropDown={setDropDownNotification}
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
