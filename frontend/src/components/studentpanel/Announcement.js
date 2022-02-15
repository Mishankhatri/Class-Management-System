import React, { useState } from "react";
import * as MdIcons from "react-icons/md";
import InnerHeader from "../common/InnerHeader";

import AnnouncementTable from "./TableData/AnnouncementTable";
import AnnouncementTeacher from "./TableData/TeacherAnnouncement";

function Announcement() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"View Announcements"} />
      <div className="main-content">
        <h4 className="h3">
          Announcement:
          <button
            className={`btn-custom ${showAdmin ? "btn-active" : ""}`}
            onClick={() => {
              setShowAdmin(true);
            }}>
            From Admin
          </button>
          |
          <button
            className={`btn-custom ${!showAdmin ? "btn-active" : ""}`}
            onClick={() => {
              setShowAdmin(false);
            }}>
            From Teacher
          </button>
        </h4>

        {showAdmin ? (
          <div className="card-section">
            <h2 className="heading">Announcement From Admin</h2>
            <div className="content-section">
              <div className="mid-content">
                <AnnouncementTable />
              </div>
            </div>
          </div>
        ) : (
          <div className="card-section">
            <h2 className="heading">Announcement From Teacher</h2>
            <div className="content-section">
              <div className="mid-content">
                <AnnouncementTeacher />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Announcement;
