import React from "react";
import InnerHeader from "../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import AssignmentTableData from "./AssignmentTableData";

function DownloadAssignment() {
  return (
    <React.Fragment>
      <InnerHeader icon={<MdIcons.MdUploadFile />} name={"View Assignments"} />
      <div className="main-content">
        <div className="card-section">
          <div className="heading">
            <span className="title-icon">
              <FaIcons.FaChalkboardTeacher />
            </span>
            <span className="title">View Assignments</span>
          </div>
          <div className="content-section">
            <AssignmentTableData />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default DownloadAssignment;
