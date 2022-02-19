import React from "react";
import * as MdIcons from "react-icons/md";
import InnerHeader from "../../../common/InnerHeader";
import ClassTableData from "./ClassTableData";

function ViewClass() {
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"View Class"} />
      <ClassTableData />
    </div>
  );
}

export default ViewClass;
