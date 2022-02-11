import React, { useEffect, useState, useMemo } from "react";
import TableContainer from "../../../common/Table/TableContainer";
import { DateRangeColumnFilter } from "./../../../common/Table/filters";

import { useSelector, useDispatch } from "react-redux";
import { ViewStudentAttendance } from "../../../../redux/actions/subjectactions";
import Loading from "./../../../common/Loading";

const AttendanceTableData = ({ click, setClick }) => {
  const { attendance } = useSelector((state) => state.students);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ViewStudentAttendance());
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "SN",
        Cell: ({ row: { index } }) => {
          return index + 1;
        },
        SearchAble: false,
      },
      {
        Header: "Name",
        accessor: (d) => {
          if (d.student.middleName == null) {
            d.student.middleName = "";
          }
          return `${d.student.first_name} ${d.student.middleName} ${d.student.last_name}`;
        },
        SearchAble: true,
      },
      {
        Header: "SRN",
        accessor: (d) => d.student.SRN,
        SearchAble: true,
      },
      {
        Header: "Class",
        accessor: (d) => {
          return `${d.grade.class_name}: ${d.grade.section}`;
        },
        SearchAble: true,
      },
      {
        Header: "Date",
        accessor: "date",
        Filter: DateRangeColumnFilter,
        filter: "dateBetween",
        SearchAble: true,
      },
      {
        Header: "Subject",
        accessor: "subject.subject_name",
        SearchAble: true,
      },
      {
        Header: "Attendance",
        accessor: "attendance_status",
        SearchAble: true,
      },

      {
        Header: "Teacher",
        accessor: (d) => {
          return `${d.teacher.first_name} ${
            d.teacher.middle_name ? d.teacher.middle_name : ""
          } ${d.teacher.last_name}`;
        },
        SearchAble: true,
      },
    ],
    []
  );

  return attendance ? (
    <>
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        <TableContainer
          columns={columns}
          data={attendance}
          isRangeSearch={true}
        />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default AttendanceTableData;
