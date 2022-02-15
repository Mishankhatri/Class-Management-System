import React, { useEffect } from "react";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import InnerHeader from "../common/InnerHeader";
import AttendanceTableData from "./TableData/AttendanceTableData";
import TextInput from "../common/InputField/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { ViewStudentAttendance } from "../../redux/actions/subjectactions";
import Loading from "../common/Loading";

function ViewAttendance() {
  const { attendance } = useSelector((state) => state.students);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ViewStudentAttendance());
  }, []);

  let totalAbsent = 0;
  let totalPresent = 0;
  if (attendance)
    for (let i = 0; i < attendance.length; i++) {
      attendance[i].attendance_status == "ABSENT"
        ? totalAbsent++
        : totalPresent++;
    }

  return attendance ? (
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
              <AttendanceTableData attendance={attendance} />
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default ViewAttendance;
