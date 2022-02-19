import React from "react";
import { baseURL } from "../../../../axios";
import MaterialTableContainer from "../../../../common/MaterialTableContainer";

function AssignTeacherTable() {
  const columns = [
    { title: "Teacher", field: "teacher", searchable: true },
    { title: "Subject", field: "subject" },
    { title: "Grade", field: "grade" },
  ];

  const url = `${baseURL}AssignTeacherToSubjectsAPI?`;
  return (
    <React.Fragment>
      <MaterialTableContainer columns={columns} url={url} />
    </React.Fragment>
  );
}
export default AssignTeacherTable;
