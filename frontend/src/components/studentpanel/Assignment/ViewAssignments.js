import React from "react";
import InnerHeader from "../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import StudentAssignmentViewTable from "./StudentAssignmentViewTable";

function ViewAssignments() {
  return (
    <React.Fragment>
      <InnerHeader icon={<MdIcons.MdUploadFile />} name={"View Assignments"} />
      <StudentAssignmentViewTable />
    </React.Fragment>
  );
}
export default ViewAssignments;
