import React, { useState } from "react";
import * as MdIcons from "react-icons/md";
import InnerHeader from "../../../common/InnerHeader";

import AnnounceByMeTable from "./AnnounceByMeTable";
import AnnouncementTableData from "./AnnouncementTableData";

function ViewAnnouncements() {
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
            Announced By Me
          </button>
        </h4>

        {showAdmin ? (
          <div className="card-section">
            <h2 className="heading">Announcement From Admin</h2>
            <div className="content-section">
              <div className="mid-content">
                <AnnouncementTableData />
              </div>
            </div>
          </div>
        ) : (
          <div className="card-section">
            <h2 className="heading">Announcement Created By Me</h2>
            <div className="content-section">
              <div className="mid-content">
                <AnnounceByMeTable />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewAnnouncements;
