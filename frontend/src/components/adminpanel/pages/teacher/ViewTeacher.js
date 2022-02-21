import React from "react";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import "../users/UserProfile.css";
import TeacherTableData from "./TeacherTableData";

function ViewTeacher() {
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"View Teacher"} />
      <TeacherTableData />
    </div>
  );
}

export default ViewTeacher;
