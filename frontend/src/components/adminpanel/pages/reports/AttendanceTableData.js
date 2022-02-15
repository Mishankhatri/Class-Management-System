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
        accessor: "student",
        SearchAble: true,
      },

      {
        Header: "Class",
        accessor: "grade",
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
        accessor: "subject",
        SearchAble: true,
      },
      {
        Header: "Attendance",
        accessor: "attendance_status",
        SearchAble: true,
      },

      {
        Header: "Teacher",
        accessor: "teacher",
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
