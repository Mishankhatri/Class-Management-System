import React, { useEffect, useState } from "react";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import InnerHeader from "../common/InnerHeader";
import AttendanceTableData from "./TableData/AttendanceTableData";
import TextInput from "../common/InputField/TextInput";

import axiosInstance from "../../axios";
import { useSelector } from "react-redux";

function ViewAttendance() {
  const { user } = useSelector((state) => state.auth);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/attendance?student=${user.username}`)
      .then(({ data: { results } }) => {
        setAttendance(results);
      });
  }, []);

  let totalAbsent = 0;
  let totalPresent = 0;
  if (attendance) {
    for (let i = 0; i < attendance.length; i++) {
      attendance[i].attendance_status == "ABSENT"
        ? totalAbsent++
        : totalPresent++;
    }
  }

  return (
    <>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"View Attendance"} />
      <div className="main-content">
        <div className="card-section">
          <div className="heading">
            <span className="title-icon">
              <FaIcons.FaReact />
            </span>
            <span className="title">Attendance</span>
          </div>
          <div className="content-section">
            <div className="custom-modal-input">
              <TextInput
                title={"Total Present"}
                icon={<FaIcons.FaLevelUpAlt className="mid-icon" />}
                disabled={true}
                name="totalPresent"
                hasValue={true}
                value={totalPresent}
              />
              <TextInput
                title={"Total Absent"}
                icon={<FaIcons.FaLevelDownAlt className="mid-icon" />}
                disabled={true}
                name="totalAbsent"
                hasValue={true}
                value={totalAbsent}
              />
            </div>
            <h2 className="h3">View All Detail</h2>
            <div style={{ border: "1px solid black" }}>
              {attendance && <AttendanceTableData attendance={attendance} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewAttendance;
