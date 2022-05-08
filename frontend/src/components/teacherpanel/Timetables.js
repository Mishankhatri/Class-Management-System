import React, { useState } from "react";
import InnerHeader from "./../common/InnerHeader";
import * as MdIcons from "react-icons/md";

import "../adminpanel/pages/users/UserProfile.css";
import TimeTableData from "./TimeTableData";

function ViewTimetables() {
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"View Timetables"} />
      <TimeTableData />
    </div>
  );
}

export default ViewTimetables;
