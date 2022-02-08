import React, { useState } from "react";
import InnerHeader from "./../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import AttendanceTableData from "./../../adminpanel/pages/reports/AttendanceTableData";
import ChangeInput from "../../common/Modal/ChangeInput";
import AttendanceInputValue from "./../../values/TeacherPanel/AttendanceInputValue";

function ViewAttendance() {
  const [click, setClick] = useState(false);
  const onSubmit = (data, e) => {
    e.target.reset();
    console.log(data);
    setClick(false);
  };
  return (
    <>
      {click && (
        <ChangeInput
          onSubmit={onSubmit}
          valueArray={AttendanceInputValue()}
          click={click}
          setClick={setClick}
          heading={"View Attendance"}
          isCustom1={true} //For showing grid 3
        />
      )}
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"View Attendance"} />
      <div className="main-content">
        <AttendanceTableData click={click} setClick={setClick} />
      </div>
    </>
  );
}

export default ViewAttendance;
