import React, { useMemo } from "react";
import TableContainer from "../../common/Table/TableContainer";
import {
  DateRangeColumnFilter,
  SelectColumnFilter,
} from "./../../common/Table/filters";

const AttendanceTableData = ({ attendance }) => {
  console.log(attendance);
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

  return (
    <>
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        <TableContainer
          columns={columns}
          data={attendance}
          isRangeSearch={true}
        />
      </div>
    </>
  );
};

export default AttendanceTableData;
