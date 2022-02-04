import React from "react";
import * as MdIcons from "react-icons/md";
import InnerHeader from "../common/InnerHeader";
import AttendanceTableData from "./TableData/AttendanceTableData";

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
