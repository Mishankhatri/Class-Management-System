import React, { useMemo } from "react";
import MaterialTableContainer from "../../../common/MaterialTableFilter";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewAttendanceTable = ({ gradeId, subject, date }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleView = (row) => {
    navigate(`/teacher/attendance/edit/id=${row.id}`);
  };

  const columns = useMemo(
    () => [
      {
        title: "Name",
        minWidth: 200,
        render: (d) => {
          return `${d.student.first_name} ${d.student.middle_name} ${d.student.last_name}`;
        },
      },

      {
        title: "Class",
        render: (d) => {
          return `${d.grade.class_name}:${d.grade.section}`;
        },
      },
      {
        title: "Date",
        field: "date",
      },
      {
        title: "Subject",
        render: (d) => {
          return `${d.subject.subject_name}: ${d.subject.subject_code}`;
        },
      },
      {
        title: "Attendance",
        field: "attendance_status",
      },
      {
        title: "Action",
        render: (row) => {
          return (
            <>
              <button
                className="btn-custom btn-primary btn-1"
                onClick={() => handleView(row)}>
                Edit
              </button>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        {date ? (
          <MaterialTableContainer
            columns={columns}
            url={"attendance"}
            title="View Student Attendance"
            filter={`teacher=${user.username}&grade=${gradeId}&subject=${subject}&date=${date}`}
          />
        ) : (
          <MaterialTableContainer
            columns={columns}
            url={"attendance"}
            title="View Student Attendance"
            filter={`teacher=${user.username}&grade=${gradeId}&subject=${subject}`}
          />
        )}
      </div>
    </>
  );
};

export default ViewAttendanceTable;
