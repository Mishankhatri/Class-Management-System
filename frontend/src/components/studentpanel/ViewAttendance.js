import React from "react";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import InnerHeader from "../common/InnerHeader";
import AttendanceTableData from "./TableData/AttendanceTableData";
import { Controller, useForm } from "react-hook-form";
import InputField from "./../common/InputField/InputField";
import { HeaderInputField } from "./../common/InputField/HeaderInputField";
import TextInput from "../common/InputField/TextInput";

function ViewAttendance() {
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
                value={"23"}
              />
              <TextInput
                title={"Total Absent"}
                icon={<FaIcons.FaLevelDownAlt className="mid-icon" />}
                disabled={true}
                name="totalAbsent"
                hasValue={true}
                value={"2"}
              />
            </div>
            <h2 className="h3">View All Detail</h2>
            <div style={{ border: "1px solid black" }}>
              <AttendanceTableData />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewAttendance;
