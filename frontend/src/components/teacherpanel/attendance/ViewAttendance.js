import React from "react";
import InnerHeader from "./../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import AttendanceTableData from "./../../adminpanel/pages/reports/AttendanceTableData";

function ViewAttendance() {
  return (
    <>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"View Attendance"} />
      <div className="main-content">
        <AttendanceTableData />
      </div>
    </>
  );
}

export default ViewAttendance;
