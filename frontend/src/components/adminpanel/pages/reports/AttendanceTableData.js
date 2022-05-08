import React, { useMemo } from "react";
import { default as MaterialTableFilter } from "../../../../common/MaterialTableFilter";

const AttendanceTableData = ({ gradeId, subject, date }) => {
  const columns = useMemo(
    () => [
      {
        title: "SN",
        width: 100,
        render: ({ tableData: { id: index } }) => {
          return index + 1;
        },
      },
      {
        title: "Name",
        render: (d) => {
          return `${d.student.first_name} ${d.student.middle_name} ${d.student.last_name}`;
        },
      },

      {
        title: "Class",
        render: (d) => {
          return `${d.grade.class_name}: ${d.grade.section}`;
        },
      },
      {
        title: "Date",
        field: "date",
      },
      {
        title: "Subject",
        render: (d) => {
          return `${d.subject?.subject_name}: ${d.subject?.subject_code}`;
        },
      },
      {
        title: "Attendance",
        field: "attendance_status",
      },

      {
        title: "Teacher",
        render: (d) => {
          return `${d.teacher.first_name} ${d.teacher.middle_name} ${d.teacher.last_name}`;
        },
      },
    ],
    []
  );

  return (
    <>
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        {date ? (
          <MaterialTableFilter
            columns={columns}
            url={"attendance"}
            title="View Student Attendance"
            filter={`grade=${gradeId}&subject=${subject}&date=${date}`}
          />
        ) : (
          <MaterialTableFilter
            columns={columns}
            url={"attendance"}
            title="View Student Attendance"
            filter={`grade=${gradeId}&subject=${subject}`}
          />
        )}
      </div>
    </>
  );
};

export default AttendanceTableData;
