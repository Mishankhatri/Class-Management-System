import React, { useState } from "react";
import * as MdIcons from "react-icons/md";
import InnerHeader from "../common/InnerHeader";

import AnnouncementTable from "./TableData/AnnouncementTable";
import AnnouncementTeacher from "./TableData/TeacherAnnouncement";

function Announcement() {
  const [showAdmin, setShowAdmin] = useState(true);
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"View Announcements"} />
      <div className="main-content">
        <h4 className="h3">Announcement By Teachers</h4>

        <div className="card-section">
          <h2 className="heading">Announcement From Teacher</h2>
          <div className="content-section">
            <div className="mid-content">
              <AnnouncementTeacher />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Announcement;
