import React, { useState } from "react";
import InnerHeader from "./../common/InnerHeader";
import * as MdIcons from "react-icons/md";

import "../adminpanel/pages/users/UserProfile.css";
import TimeTableData from "./TimeTableData";

function ViewTimetables() {
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"View Timetables"} />
      <div className="main-content">
        <div className="timetable">
          <h2 className="h3">View All Slots</h2>
          <TimeTableData />
        </div>
      </div>
    </div>
  );
}

export default ViewTimetables;
