import React from "react";
import InnerHeader from "../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import AssignmentTableData from "./AssignmentTableData";

function DownloadAssignment() {
  return (
    <React.Fragment>
      <InnerHeader icon={<MdIcons.MdUploadFile />} name={"View Assignments"} />
      <AssignmentTableData />
    </React.Fragment>
  );
}
export default DownloadAssignment;
