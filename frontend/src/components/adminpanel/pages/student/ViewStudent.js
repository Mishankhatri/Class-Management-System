import React from "react";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import StudentTableData from "./StudentTableData";

function ViewStudent() {
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"View Student"} />
      <StudentTableData />
    </div>
  );
}

export default ViewStudent;
