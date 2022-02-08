import React from "react";
import InnerHeader from "../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import SelectInputField from "../../common/InputField/SelectInputField";
import StudentAssignmentViewTable from "./StudentAssignmentViewTable";

function ViewAssignments() {
  const selectChange = (data) => {
    console.log(data);
  };
  return (
    <React.Fragment>
      <InnerHeader icon={<MdIcons.MdUploadFile />} name={"View Assignments"} />
      <div className="main-content">
        <div className="card-section">
          <div className="heading">
            <span className="title-icon">
              <FaIcons.FaReact />
            </span>
            <span className="title">Select Subject</span>
          </div>
          <div className="content-section">
            <SelectInputField
              onChange={selectChange}
              title={"Select Subject"}
              icon={<FaIcons.FaChalkboard className="mid-icon" />}
              name={"selectSubjects"}
              options={[
                { label: "Social", value: "Social" },
                { label: "Science", value: "Science" },
              ]}
            />
          </div>
        </div>
        <div className="card-section">
          <div className="heading">
            <span className="title-icon">
              <FaIcons.FaChalkboardTeacher />
            </span>
            <span className="title">View Assignments</span>
          </div>
          <div className="content-section">
            <StudentAssignmentViewTable />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default ViewAssignments;
