import React, { useEffect, useState, useMemo } from "react";
import TableContainer from "../../common/Table/TableContainer";
import {
  DateRangeColumnFilter,
  SelectColumnFilter,
} from "./../../common/Table/filters";

import { useSelector, useDispatch } from "react-redux";
import { ViewStudentAttendance } from "../../../redux/actions/subjectactions";
import Loading from "./../../common/Loading";
import reverseArray from "../../common/ReverseArray";

const AttendanceTableData = ({ attendance }) => {
  // const filterAttendance =
  //   attendance &&
  //   reverseArray(attendance).filter(
  //     (value) => value.student.user.id === user.id
  //   );

  const columns = useMemo(
    () => [
      {
        Header: "SN",
        Cell: ({ row }) => row.index + 1,
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
        Filter: SelectColumnFilter,
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
