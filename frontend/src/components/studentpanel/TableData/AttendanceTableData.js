import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import MaterialTableContainer from "../../../common/MaterialTableFilter";

const AttendanceTableData = () => {
  const { user } = useSelector((state) => state.auth);
  const columns = useMemo(
    () => [
      {
        title: "SN",
        render: ({ tableData: row }) => row.id + 1,
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
        title: "Teacher",
        render: (d) => {
          return `${d.teacher.first_name} ${d.teacher.middle_name} ${d.teacher.last_name}`;
        },
      },
      {
        title: "Attendance",
        field: "attendance_status",
      },
    ],
    []
  );

  return (
    <>
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        <MaterialTableContainer
          columns={columns}
          url="attendance"
          title={"Attendance"}
          filter={`student=${user.username}`}
        />
      </div>
    </>
  );
};

export default AttendanceTableData;
