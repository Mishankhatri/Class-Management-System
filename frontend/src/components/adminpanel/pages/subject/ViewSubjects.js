import React from "react";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import SubjectDataTable from "./SubjectDataTable";
import "./../users/UserProfile.css";

function ViewSubjects() {
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"View Subject"} />
      <SubjectDataTable />
    </div>
  );
}

export default ViewSubjects;
