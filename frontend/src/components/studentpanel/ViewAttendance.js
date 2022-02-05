import React from "react";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import InnerHeader from "../common/InnerHeader";
import AttendanceTableData from "./TableData/AttendanceTableData";
import { Controller, useForm } from "react-hook-form";
import InputField from "./../common/InputField/InputField";
import { HeaderInputField } from "./../common/InputField/HeaderInputField";

function ViewAttendance() {
  const { control, setValue } = useForm();
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
              <div className="mid-content">
                <HeaderInputField
                  title={"Total Present".toUpperCase()}
                  icon={<FaIcons.FaLevelUpAlt className="mid-icon" />}
                />
                <div className="label-input">
                  <input
                    type="text"
                    className="input"
                    disabled
                    name="totalPresent"
                    value={"12"}
                  />
                </div>
              </div>

              <div className="mid-content">
                <HeaderInputField
                  title={"Total Absent".toUpperCase()}
                  icon={<FaIcons.FaLevelDownAlt className="mid-icon" />}
                />
                <div className="label-input">
                  <input
                    type="text"
                    className="input"
                    disabled
                    name="totalPresent"
                    value={5}
                  />
                </div>
              </div>
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
