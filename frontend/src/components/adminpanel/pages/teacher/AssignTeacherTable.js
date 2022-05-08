import React from "react";
import { baseURL } from "../../../../axios";
import MaterialTableContainer from "../../../../common/MaterialTableContainer";

function AssignTeacherTable() {
  const columns = [
    {
      title: "Teacher",
      render: (d) => {
        return `${d.teacher.first_name} ${d.teacher.middle_name} ${d.teacher.last_name}`;
      },
      searchable: true,
    },
    {
      title: "Subject",
      render: (data) => {
        return `${data.subject.subject_name} : ${data.subject.subject_code}`;
      },
    },
    {
      title: "Grade",
      render: (data) => {
        return `${data.grade.class_name} : ${data.grade.section}`;
      },
    },
  ];

  const url = `${baseURL}AssignTeacherToSubjectsAPI`;
  return (
    <React.Fragment>
      <MaterialTableContainer
        columns={columns}
        url={url}
        title={"Assign Teachers"}
      />
    </React.Fragment>
  );
}
export default AssignTeacherTable;
