import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import {
  DateRangeColumnFilter,
  SelectColumnFilter,
} from "../../common/Table/filters";
import TableContainer from "../../common/Table/TableContainer";
import { attendanceDetail } from "../../values/AdminPanel/AttendanceInput";

const AttendanceTableData = () => {
  const data = attendanceDetail;

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
        Header: "Date",
        accessor: "date",
        Filter: DateRangeColumnFilter,
        filter: "dateBetween",
        SearchAble: true,
      },
      {
        Header: "Subject",
        accessor: "subject",
        Filter: SelectColumnFilter,
        filter: "includes",
        SearchAble: true,
      },
      {
        Header: "Attendance",
        accessor: "attendance",
        SearchAble: true,
        Filter: SelectColumnFilter,
        filter: "includes",
      },
    ],
    []
  );

  return (
    <>
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        <TableContainer columns={columns} data={data} isRangeSearch={true} />
      </div>
    </>
  );
};

export default AttendanceTableData;
